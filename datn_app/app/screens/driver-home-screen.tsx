import {Button, Center, Text, View} from 'native-base';
import {useAppSelector} from '../models/root-store/root-store';
import MapView, {
    PROVIDER_GOOGLE,
    AnimatedRegion,
    MarkerAnimated,
} from 'react-native-maps';
import {Alert, Dimensions, StyleSheet} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {openSettings} from 'react-native-permissions';
import {requestLocationPermission} from '../utils/permissions';
import {getAddressFromLocation, getCurrentPosition} from '../utils/location';
import {useCaculateDistanceMutation} from '../services/api';
import SVGPowerOff from '../components/icons/powerOff';
interface PositionProps {
    latitude?: number;
    longitude?: number;
    description?: string;
}
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
    },
});
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const DriverHomeScreen = () => {
    const user = useAppSelector(state => state.auth);
    const [caculateDistance] = useCaculateDistanceMutation();
    const mapRef = useRef(null);
    const [departureAddress, setDepartureAddress] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');
    const [departureRegion, setDepartureRegion] = useState<PositionProps>({});
    // const [destinationRegion, setDestinationRegion] = useState<PositionProps>(
    //     {},
    // );
    const getLiveLocation = async () => {
        const locPermissionDenied = await requestLocationPermission();
        if (locPermissionDenied.success) {
            const {latitude, longitude, heading} = await getCurrentPosition();
            console.log('get live location after 4 second', heading);
            new AnimatedRegion({latitude, longitude});
            setDepartureRegion({
                latitude: latitude,
                longitude: longitude,
            });
            getAddressFromLocation(latitude, longitude).then(result => {
                setDepartureAddress(result);
            });
        } else {
            Alert.alert(
                '',
                'Driver Service yêu cầu quyền truy cập vị trí của bạn',
                [{text: 'Ok'}, {text: 'Cài đặt', onPress: openSettings}],
            );
        }
    };
    useEffect(() => {
        if (!departureRegion.latitude || !departureRegion.longitude)
            getLiveLocation();
    }, [departureRegion.latitude, departureRegion.longitude]);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.fitToCoordinates(
                [
                    {
                        latitude: departureRegion.latitude,
                        longitude: departureRegion.longitude,
                    },
                ],
                {
                    edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
                    animated: true,
                },
            );
        }
    }, [departureRegion]);
    useEffect(() => {
        departureAddress &&
            destinationAddress &&
            caculateDistance({departureAddress, destinationAddress}).then(
                res => {
                    console.log(
                        'data',
                        res.data.rows[0].elements[0].distance.value,
                    );
                },
            );
    }, [departureAddress, destinationAddress]);

    return (
        <>
            <View w="100%">
                <View
                    w="100%"
                    h="20"
                    style={{
                        backgroundColor: '#FBC632',
                    }}>
                    <Text ml={4} mt={5} fontWeight="bold">
                        Xin Chào
                    </Text>
                    <Text ml={10} mt={1} fontWeight="bold" color="white">
                        {user?.user.fullName}
                    </Text>
                </View>
                <Center w="100%" h="full" style={{position: 'relative'}}>
                    <View
                        w="full"
                        h="full"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                        }}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            ref={mapRef}
                            showsUserLocation
                            followsUserLocation
                            loadingEnabled
                            region={{
                                latitude:
                                    departureRegion.latitude || 17.1653511,
                                longitude:
                                    departureRegion.longitude || 110.9152344,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            }}>
                            {departureRegion.latitude &&
                                departureRegion.longitude && (
                                    <MarkerAnimated
                                        coordinate={{
                                            latitude: departureRegion.latitude,
                                            longitude:
                                                departureRegion.longitude,
                                        }}
                                        title="Vị Trí Hiện Tại"
                                        pinColor="#FBC632"
                                        description={
                                            departureRegion.description
                                        }
                                    />
                                )}
                        </MapView>
                        {/* <Button
                            borderRadius={20}
                            style={{
                                position: 'static',
                                width: '14%',
                                marginLeft: 10,
                                marginTop: 5,
                                backgroundColor: '#fff',
                            }}>
                            <SVGPowerOff />
                        </Button> */}
                    </View>
                </Center>
            </View>
        </>
    );
};
