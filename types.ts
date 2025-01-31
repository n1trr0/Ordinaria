import { OptionalId } from "mongodb";

export type RestaurantModel = OptionalId<{
    name: string,
    address: string,
    phone: string,
    lat: number,
    lon: number,
}>

//"https://api.api-ninjas.com/v1/validatephone?number="
export type PhoneData = {
    is_valid: boolean,
    country: string,
    format_international: string, //Previene la duplicacion de telefonos al tener todos el mismo formatos
}

//https://api.api-ninjas.com/v1/worldtime?timezone=
export type Time = {
    hour: string,
    minute: string,
}

//https://api.api-ninjas.com/v1/geocoding?city=
//Para luego obtener el clima(temperatura) sin opcion de pago es necesario latitud/longitud de la ciudad
export type LatLon = {
    latitude: number,
    longitude: number,
}