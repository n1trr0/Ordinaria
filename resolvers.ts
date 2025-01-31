import { Collection } from "mongodb";
import { RestaurantModel } from "./types.ts";
import { ObjectId } from "mongodb";
import { getLongitudeLatitude, getPhoneInfo, getTemp, getTime } from "./apiNinja.ts";
import { GraphQLError } from "graphql";


type Context = {
    RestaurantCollection: Collection<RestaurantModel>
}


export const resolvers = {
    Query: {
        getRestaurants: async(_: unknown, __: unknown, ctx: Context): Promise<RestaurantModel[]> => {
            return await ctx.RestaurantCollection.find().toArray()
        },
        getRestaurant: async(_: unknown, id: string, ctx: Context): Promise<RestaurantModel|null> => {
            return await ctx.RestaurantCollection.findOne({_id: new ObjectId(id)})
        },
    },
    Mutation: {
        addRestaurant: async(_: unknown, args : {name: string, street: string, city: string, phone: string}, ctx: Context): Promise<RestaurantModel> => {
            const phoneData = await getPhoneInfo(args.phone)
            if(!phoneData.is_valid){throw new GraphQLError("Phone number is not valid")}
            const phoneExist = await ctx.RestaurantCollection.findOne({phone: phoneData.format_international})
            if(phoneExist){throw new GraphQLError("Phone number is already taken")}
            const address = args.street + ", " + args.city + ", " + phoneData.country
            const latlon = await getLongitudeLatitude(args.city)

            const {insertedId} = await ctx.RestaurantCollection.insertOne({
                name: args.name,
                address: address,
                phone: phoneData.format_international,
                lat: latlon[0].latitude,
                lon: latlon[0].longitude,
            })

            return{
                _id: insertedId,
                name: args.name,
                address: address,
                phone: phoneData.format_international,
                lat: latlon[0].latitude,
                lon: latlon[0].longitude,
            }
        },
        deleteRestaurant: async(_:unknown, id: string, ctx: Context): Promise<boolean> => {
            const {deletedCount} = await ctx.RestaurantCollection.deleteOne({_id: new ObjectId(id)})
            if(deletedCount === 0){return false}
            return true
        }

    },
    Restaurant: {
        id: (parent: RestaurantModel): string => parent._id!.toString(),
        time: async (parent: RestaurantModel): Promise<string> => {
            const time = await getTime(parent.lon, parent.lat)
            return time.hour+ ":" + time.minute
        },
        temperature: async(parent: RestaurantModel): Promise<string> => {
            return await getTemp(parent.lon, parent.lat)
        }

    }
}