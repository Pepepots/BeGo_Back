import mapsApi from '../api/mapsApi';


export const getCoordinates = async (id:string = "") => {
    const resp = await mapsApi.get(`geocode/json?place_id=${id}&key=${process.env.MAPS_KEY}`)
    const { geometry } = resp.data.results[0]
    const { location } = geometry

    return location
}

export const getKm = async (from:string, to: string) => {
    const resp = await mapsApi.get(`distancematrix/json?destinations=place_id:${from}&origins=place_id:${to}&key=${process.env.MAPS_KEY}`)
    const { elements } = resp.data.rows[0]
    const { distance } = elements[0]

    return distance
}
