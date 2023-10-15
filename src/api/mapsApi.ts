import axios from 'axios';


const mapsApi = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/'
});

export default mapsApi;