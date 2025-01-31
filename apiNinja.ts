import { LatLon, PhoneData, Time } from "./types.ts";

export const getPhoneInfo = async (phone: string): Promise<PhoneData> => {
    const API_KEY = Deno.env.get("API_KEY")
    if (!API_KEY) {throw new Error("API KEY not found")}

    const url = "https://api.api-ninjas.com/v1/validatephone?number=" + phone
    const data = await fetch(url,{
        headers: {
            'X-Api-Key': API_KEY
        },
    })

    if(data.status !== 200){throw new Error("API Ninja request failed")}
    const response = await data.json()
    return response
}

export const getTime = async (lon: number, lat: number): Promise<Time> => {
    const API_KEY = Deno.env.get("API_KEY")
    if (!API_KEY) {throw new Error("API KEY not found")}

    const url = "https://api.api-ninjas.com/v1/worldtime?lat=" + lat + "&lon=" + lon
    const data = await fetch(url,{
        headers: {
            'X-Api-Key': API_KEY
        },
    })

    if(data.status !== 200){throw new Error("API Ninja request failed")}
    const response = await data.json()
    return response
}

export const getLongitudeLatitude = async (city: string): Promise<LatLon[]> => {
    const API_KEY = Deno.env.get("API_KEY")
    if (!API_KEY) {throw new Error("API KEY not found")}

    const url = "https://api.api-ninjas.com/v1/geocoding?city=" + city
    const data = await fetch(url,{
        headers: {
            'X-Api-Key': API_KEY
        },
    })

    if(data.status !== 200){throw new Error("API Ninja request failed")}
    const response = await data.json()
    return response
}

export const getTemp = async (lon: number, lat: number): Promise<string> => {
    const API_KEY = Deno.env.get("API_KEY")
    if (!API_KEY) {throw new Error("API KEY not found")}

    const url = "https://api.api-ninjas.com/v1/weather?lat=" + lat + "&lon=" + lon
    const data = await fetch(url,{
        headers: {
            'X-Api-Key': API_KEY
        },
    })

    if(data.status !== 200){throw new Error("API Ninja request failed")}
    const response = await data.json()
    return response.temp
}



