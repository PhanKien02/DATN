import {Center, FlatList, Input, Text, VStack, View} from 'native-base';
import {useAppSelector} from '../models/root-store/root-store';
import SVGLocationIcon from '../components/icons/location';
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    AnimatedRegion,
    Polyline,
} from 'react-native-maps';
import {Alert, Dimensions, StyleSheet} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {openSettings} from 'react-native-permissions';
import {requestLocationPermission} from '../utils/permissions';
import {
    getAddressFromLocation,
    getCurrentPosition,
    getDirections,
} from '../utils/location';
import {API_GG_MAP_KEY} from '../constants/keyAPIGoogleMap';
import MapViewDirections from 'react-native-maps-directions';
import {BookingModal} from '../components/modal/bookingModal';
import {useDebouncedEffect} from '../utils/useDebouncedEffect';
import {useGetLocationFromAddressMutation} from '../services/api';
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
export const HomeScreen = () => {
    const user = useAppSelector(state => state.auth);
    const mapRef = useRef(null);
    const [departureAddress, setDepartureAddress] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');
    const [departureRegion, setDepartureRegion] = useState<PositionProps>({});
    const [destinationRegion, setDestinationRegion] = useState<PositionProps>(
        {},
    );
    const [getLocation] = useGetLocationFromAddressMutation();
    const [dataRoute, setDataRoute] = useState<{
        poylines: {
            latitude: number;
            longitude: number;
        }[];
        distance: string;
        duration: string;
    }>({
        poylines: [],
        distance: '',
        duration: '',
    });
    const getLiveLocation = async () => {
        const locPermissionDenied = await requestLocationPermission();
        if (locPermissionDenied.success) {
            const {latitude, longitude} = await getCurrentPosition();
            new AnimatedRegion({latitude, longitude});
            setDepartureRegion({
                latitude: latitude,
                longitude: longitude,
            });

            // getAddressFromLocation(latitude, longitude).then(result => {
            //     console.log({result});
            //     setDepartureAddress(result);
            // });
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
    }, []);
    useDebouncedEffect(
        () =>
            getDirections(departureAddress, destinationAddress).then(data => {
                setDataRoute(data);
            }),
        [departureAddress, destinationAddress],
        500,
    );
    useDebouncedEffect(
        () =>
            departureAddress &&
            destinationAddress &&
            getLocation({departureAddress})
                .then(response => {
                    console.log({departureLocation: response.data});
                })
                .catch(Err => {
                    console.log({Err});
                }),
        [departureAddress],
        300,
    );
    useDebouncedEffect(
        () =>
            departureAddress &&
            destinationAddress &&
            getLocation({destinationAddress})
                .then(response => {
                    console.log({destinationAddress: response.data});
                })
                .catch(Err => {
                    console.log({Err});
                }),
        [destinationAddress],
        300,
    );

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.fitToCoordinates(
                [
                    {
                        latitude: departureRegion.latitude,
                        longitude: departureRegion.longitude,
                    },
                    {
                        latitude: destinationRegion.latitude,
                        longitude: destinationRegion.longitude,
                    },
                ],
                {
                    edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
                    animated: true,
                },
            );
        }
    }, [departureRegion, destinationRegion]);
    // console.log({
    //     departureRegion,
    //     departureAddress,
    //     destinationRegion,
    //     destinationAddress,
    // });
    return (
        <>
            <View w="100%" h="72" margin={0}>
                <View
                    w="100%"
                    height="50%"
                    mb={100}
                    style={{
                        backgroundColor: '#FBC632',
                    }}>
                    <Text ml={4} mt={5} fontWeight="bold">
                        Xin Chào
                    </Text>
                    <Text ml={10} mt={1} fontWeight="bold" color="white">
                        {user?.user?.fullName || ''}
                    </Text>
                </View>
                <Center>
                    <VStack
                        w="95%"
                        paddingBottom="5%"
                        backgroundColor="white"
                        borderRadius={20}
                        style={{
                            position: 'absolute',
                            top: -150,
                            zIndex: 20,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 15,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 15.0,
                            elevation: 6,
                        }}>
                        <View
                            ml={4}
                            mt={4}
                            fontWeight="bold"
                            flexDir="row"
                            w="90%">
                            <View zIndex={1}>
                                <SVGLocationIcon />
                            </View>
                            <VStack>
                                <Input
                                    w="64"
                                    borderRadius={30}
                                    placeholder="Điểm Đón"
                                    value={departureAddress}
                                    onChangeText={setDepartureAddress}
                                />
                                <FlatList
                                    data={[]}
                                    renderItem={item => (
                                        <Text>{item.item}</Text>
                                    )}
                                    w="full"
                                    style={{
                                        position: 'absolute',
                                        top: 50,
                                        zIndex: 40,
                                        backgroundColor: '#F43',
                                        borderRadius: 7,
                                    }}
                                />
                            </VStack>
                        </View>
                        <View
                            ml={4}
                            mt={3}
                            fontWeight="bold"
                            flexDir="row"
                            w="90%">
                            <View zIndex={1}>
                                <SVGLocationIcon color={'#f43'} />
                            </View>
                            <VStack>
                                <Input
                                    w="64"
                                    borderRadius={30}
                                    placeholder="Điểm Đến"
                                    value={destinationAddress}
                                    onChangeText={setDestinationAddress}
                                />
                                <FlatList
                                    data={[]}
                                    renderItem={item => (
                                        <Text>{item.item}</Text>
                                    )}
                                    w="full"
                                    style={{
                                        position: 'absolute',
                                        top: 50,
                                        zIndex: 40,
                                        backgroundColor: '#F43',
                                        borderRadius: 7,
                                    }}
                                />
                            </VStack>
                        </View>
                    </VStack>
                </Center>
            </View>
            <Center w="100%">
                <View w="95%" h="full">
                    <View
                        w="full"
                        h="62%"
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: -50,
                            zIndex: 12,
                        }}>
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={styles.map}
                            ref={mapRef}
                            onPoiClick={event => {
                                const {coordinate} = event.nativeEvent;
                                setDestinationRegion({
                                    latitude: coordinate.latitude,
                                    longitude: coordinate.longitude,
                                });
                                getAddressFromLocation(
                                    coordinate.latitude,
                                    coordinate.longitude,
                                ).then(result => {
                                    setDestinationAddress(result);
                                });
                            }}
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
                                    <Marker
                                        draggable
                                        coordinate={{
                                            latitude: departureRegion.latitude,
                                            longitude:
                                                departureRegion.longitude,
                                        }}
                                        title="Điểm Đón"
                                        pinColor="#FBC632"
                                        description={
                                            departureRegion.description
                                        }
                                        onDragEnd={event => {
                                            const {latitude, longitude} =
                                                event.nativeEvent.coordinate;
                                            setDepartureRegion({
                                                latitude: latitude,
                                                longitude: longitude,
                                            });
                                        }}
                                    />
                                )}
                            {destinationRegion.latitude &&
                                destinationRegion.longitude && (
                                    <Marker
                                        draggable
                                        coordinate={{
                                            latitude:
                                                destinationRegion.latitude,
                                            longitude:
                                                destinationRegion.longitude,
                                        }}
                                        title="Điểm Đến"
                                        description={
                                            destinationRegion.description
                                        }
                                        onDragEnd={event => {
                                            const {latitude, longitude} =
                                                event.nativeEvent.coordinate;
                                            setDestinationRegion({
                                                latitude: latitude,
                                                longitude: longitude,
                                            });
                                        }}
                                    />
                                )}
                            {departureRegion.latitude &&
                                departureRegion.longitude &&
                                destinationRegion.latitude &&
                                departureRegion.longitude && (
                                    <MapViewDirections
                                        origin={{
                                            latitude: departureRegion.latitude,
                                            longitude:
                                                departureRegion.longitude,
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
                            {dataRoute.poylines.length > 0 && (
                                <Polyline
                                    coordinates={dataRoute.poylines}
                                    strokeColor="red"
                                    strokeWidth={3}
                                />
                            )}
                        </MapView>
                        <Center
                            style={{
                                position: 'absolute',
                                width: '100%',
                                bottom: 0,
                            }}>
                            <BookingModal
                                customerId={user?.user?.id}
                                origin={'departureAddress'}
                                destination={'destinationAddress'}
                                distance={7}
                            />
                        </Center>
                    </View>
                </View>
            </Center>
        </>
    );
};
