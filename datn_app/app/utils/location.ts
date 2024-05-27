import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {API_GG_MAP_KEY} from '../constants/keyAPIGoogleMap';
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

export const getLocationFromAddress = async (address: string) => {
    const data = await Geocoder.from(address);
    return data.results[0].geometry.location;
};

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
