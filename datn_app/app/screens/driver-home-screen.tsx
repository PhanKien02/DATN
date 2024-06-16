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
import {trackingLocation} from '../utils/location';

import {useTrackingLocationDriverMutation} from '../services/api';
import MapViewDirections from 'react-native-maps-directions';
import {API_GG_MAP_KEY} from '../constants/keyAPIGoogleMap';
import {InforBookingModal} from '../components/modal/inforBooking';

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
    const [openInfo, setOpenInfo] = useState(false);
    const user = useAppSelector(state => state.auth);
    const booking = useAppSelector(state => state.boooking.booking);
    const [tracking] = useTrackingLocationDriverMutation();
    const mapRef = useRef(null);
    const [departureRegion, setDepartureRegion] = useState<PositionProps>({});
    const [originRegion, setOriginRegion] = useState<PositionProps>({});
    const [destinationRegion, setDestinationRegion] = useState<PositionProps>(
        {},
    );
    const getLiveLocation = async () => {
        const locPermissionDenied = await requestLocationPermission();
        if (locPermissionDenied.success) {
            const {latitude, longitude} = await trackingLocation();
            new AnimatedRegion({latitude, longitude});
            setDepartureRegion({
                latitude: latitude,
                longitude: longitude,
            });
            tracking({
                id: user.user.id,
                lat: latitude,
                long: longitude,
            })
                .unwrap()
                .then(() => console.log('tracking'));
        } else {
            Alert.alert(
                '',
                'Driver Service yêu cầu quyền truy cập vị trí của bạn',
                [{text: 'Cài đặt', onPress: openSettings}],
            );
        }
    };
    useEffect(() => {
        if (!departureRegion.latitude || !departureRegion.longitude)
            getLiveLocation();
    }, [departureRegion.latitude, departureRegion.longitude]);

    useEffect(() => {
        if (booking) {
            setOriginRegion({
                latitude: booking.originLatitude,
                longitude: booking.originlongitude,
                description: 'Điểm Đón ',
            });

            setDestinationRegion({
                latitude: booking.destinationLatitude,
                longitude: booking.destinationLongitude,
                description: 'Điểm Đến ',
            });
        }
    }, [booking]);
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
                        {user?.user ? user.user.fullName : ''}
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
                            {originRegion.latitude &&
                                originRegion.longitude && (
                                    <MarkerAnimated
                                        coordinate={{
                                            latitude: originRegion.latitude,
                                            longitude: originRegion.longitude,
                                        }}
                                        title="Vị Trí Đón"
                                        pinColor="#FBC632"
                                        description={originRegion.description}
                                    />
                                )}
                            {destinationRegion.latitude &&
                                destinationRegion.longitude && (
                                    <MarkerAnimated
                                        coordinate={{
                                            latitude:
                                                destinationRegion.latitude,
                                            longitude:
                                                destinationRegion.longitude,
                                        }}
                                        title="Vị Trí Đến"
                                        pinColor="#F43"
                                        description={
                                            destinationRegion.description
                                        }
                                    />
                                )}
                            {departureRegion.latitude &&
                                departureRegion.longitude &&
                                destinationRegion.latitude &&
                                destinationRegion.longitude && (
                                    <MapViewDirections
                                        origin={{
                                            latitude: originRegion.latitude,
                                            longitude: originRegion.longitude,
                                        }}
                                        destination={{
                                            latitude:
                                                destinationRegion.latitude,
                                            longitude:
                                                destinationRegion.longitude,
                                        }}
                                        apikey={API_GG_MAP_KEY}
                                        strokeColor="red"
                                        strokeWidth={2}
                                        language="vn"
                                        timePrecision="now"
                                        optimizeWaypoints={true}
                                    />
                                )}
                        </MapView>
                    </View>
                    {booking && (
                        <Center
                            style={{
                                position: 'absolute',
                                width: '100%',
                                bottom: 160,
                            }}>
                            <Button
                                backgroundColor="#FBC632"
                                w="full"
                                onPress={() => setOpenInfo(true)}>
                                Thông Tin Đơn Hàng
                            </Button>
                        </Center>
                    )}
                </Center>
            </View>
            {booking && (
                <InforBookingModal
                    open={openInfo}
                    setOpen={setOpenInfo}
                    bookingId={booking.id}
                />
            )}
        </>
    );
};
