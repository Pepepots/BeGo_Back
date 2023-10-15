import mapsApi from '../api/mapsApi';


export const getCoordinates = async (id:string) => {
    const resp = await mapsApi.get(`geocode/json?place_id=${id}&key=${process.env.MAPS_KEY}`)
    const { geometry } = resp.data.results[0]
    const { location } = geometry

    return location
}