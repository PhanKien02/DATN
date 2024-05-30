import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {API_GG_MAP_KEY} from '../constants/keyAPIGoogleMap';
import {useGetDirectionsQuery} from '../services/api';
// const client = new Client();
Geocoder.init(API_GG_MAP_KEY);
interface PositionProps {
    latitude: number;
    longitude: number;
    heading: number;
}

export const getCurrentPosition = (): Promise<PositionProps> =>
    new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            position => {
                const cords: PositionProps = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    heading: position?.coords?.heading,
                };
                return resolve(cords);
            },
            error => {
                reject(error.message);
            },
            {
                accuracy: {android: 'high', ios: 'bestForNavigation'},
                enableHighAccuracy: true,
                distanceFilter: 100,
                showLocationDialog: true,
                forceRequestLocation: true,
            },
        );
    });

export const getAddressFromLocation = async (
    lat: number,
    lng: number,
): Promise<string> => {
    const data = await Geocoder.from(lat, lng);
    var addressComponent = data.results[0].formatted_address;
    return addressComponent;
};
export const trackingLocation = (): Promise<PositionProps> =>
    new Promise((resolve, reject) => {
        Geolocation.watchPosition(
            position => {
                const cords: PositionProps = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    heading: position?.coords?.heading,
                };
                return resolve(cords);
            },
            error => {
                reject(error.message);
            },
            {
                accuracy: {android: 'high', ios: 'bestForNavigation'},
                enableHighAccuracy: true,
                distanceFilter: 100,
                showLocationDialog: true,
                forceRequestLocation: true,
            },
        );
    });
export const getDirections = async (origin: string, destination: string) => {
    const {data, error} = useGetDirectionsQuery({origin, destination});
    console.log({data, error});
    const listPoyline = data.routes[0].legs[0].steps.map(step => {
        return [
            {
                latitude: step.start_location.lat,
                longitude: step.start_location.lng,
            },
            {
                latitude: step.end_location.lat,
                longitude: step.end_location.lng,
            },
        ];
    });
    const poylines = listPoyline.reduce((prev, current) => {
        return prev.concat(current);
    });

    const distance = data.route.legs[0].distance.text;
    const duration = data.route.legs[0].duration.text;

    return {poylines, distance, duration};
};
