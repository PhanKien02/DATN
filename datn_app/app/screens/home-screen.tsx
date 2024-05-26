import {Button, Center, Text, VStack, View} from 'native-base';
import {useAppSelector} from '../models/root-store/root-store';
import SVGLocationIcon from '../components/icons/location';
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    AnimatedRegion,
} from 'react-native-maps';
import {Alert, Dimensions, StyleSheet} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {openSettings} from 'react-native-permissions';
import {requestLocationPermission} from '../utils/permissions';
import {
    getAddressFromLocation,
    getCurrentPosition,
    getLocationFromAddress,
} from '../utils/location';
import {API_GG_MAP_KEY} from '../constants/keyAPIGoogleMap';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import {useCaculateDistanceMutation} from '../services/api';
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
    const [caculateDistance] = useCaculateDistanceMutation();
    const mapRef = useRef(null);
    const departureAddressPlacesRef = useRef(null);
    const destinationRegionPlacesRef = useRef(null);
    const [departureAddress, setDepartureAddress] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');
    const [departureRegion, setDepartureRegion] = useState<PositionProps>({});
    const [destinationRegion, setDestinationRegion] = useState<PositionProps>(
        {},
    );
    const getLiveLocation = async () => {
        const locPermissionDenied = await requestLocationPermission();
        if (locPermissionDenied.success) {
            const {latitude, longitude, heading} = await getCurrentPosition();
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
    const handleSearchDepartureAddress = (value: string) => {
        if (value)
            requestLocationPermission().then(result => {
                if (result.success)
                    getLocationFromAddress(value.trim()).then(({lat, lng}) => {
                        setDepartureRegion({
                            latitude: lat,
                            longitude: lng,
                            description: value,
                        });
                    });
                else {
                    Alert.alert(
                        '',
                        'Driver Service yêu cầu quyền truy cập vị trí của bạn',
                        [
                            {text: 'Ok'},
                            {text: 'Cài đặt', onPress: openSettings},
                        ],
                    );
                }
            });
    };
    const handleSearchDestinationAddress = (value: string) => {
        if (value)
            requestLocationPermission().then(result => {
                if (result.success)
                    getLocationFromAddress(value.trim()).then(({lat, lng}) => {
                        setDestinationRegion({
                            latitude: lat,
                            longitude: lng,
                            description: value,
                        });
                    });
                else {
                    Alert.alert(
                        '',
                        'Driver Service yêu cầu quyền truy cập vị trí của bạn',
                        [
                            {text: 'Ok'},
                            {text: 'Cài đặt', onPress: openSettings},
                        ],
                    );
                }
            });
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
    useEffect(() => {
        if (departureAddressPlacesRef.current) {
            departureAddressPlacesRef.current.setAddressText(departureAddress);
        }
    }, [departureAddress]);
    useEffect(() => {
        if (destinationRegionPlacesRef.current) {
            destinationRegionPlacesRef.current.setAddressText(
                destinationAddress,
            );
        }
    }, [destinationAddress]);
    useEffect(() => {
        getAddressFromLocation(
            departureRegion.latitude,
            departureRegion.longitude,
        ).then(res => setDepartureAddress(res));
    }, [departureRegion]);
    useEffect(() => {
        getAddressFromLocation(
            destinationRegion.latitude,
            destinationRegion.longitude,
        ).then(res => setDestinationAddress(res));
    }, [destinationRegion]);
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
                        {user?.user.fullName}
                    </Text>
                </View>
                <Center>
                    <VStack
                        w="95%"
                        paddingBottom="10%"
                        backgroundColor="white"
                        borderRadius={20}
                        mb={50}
                        style={{
                            position: 'absolute',
                            top: -150,
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
                            mt={5}
                            fontWeight="bold"
                            flexDir="row"
                            w="90%">
                            <View zIndex={1}>
                                <SVGLocationIcon />
                            </View>
                            <GooglePlacesAutocomplete
                                placeholder="Điểm Đón"
                                onPress={data => {
                                    handleSearchDepartureAddress(
                                        data.description,
                                    );
                                }}
                                minLength={10}
                                ref={departureAddressPlacesRef}
                                query={{
                                    key: API_GG_MAP_KEY,
                                    language: 'vn',
                                    components: 'country:vn',
                                }}
                                currentLocation={true}
                                nearbyPlacesAPI="GooglePlacesSearch"
                                debounce={300}
                                styles={{
                                    listView: {
                                        height: '100%',
                                        overflow: 'scroll',
                                        marginLeft: -50,
                                        position: 'relative',
                                        left: 10,
                                    },
                                    container: {
                                        marginLeft: -20,
                                    },
                                }}
                            />
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
                            <GooglePlacesAutocomplete
                                placeholder="Điểm Đến"
                                onPress={data => {
                                    handleSearchDestinationAddress(
                                        data.description,
                                    );
                                }}
                                query={{
                                    key: API_GG_MAP_KEY,
                                    language: 'vn',
                                    components: 'country:vn',
                                }}
                                ref={destinationRegionPlacesRef}
                                currentLocation={true}
                                currentLocationLabel="Điểm Đến"
                                debounce={300}
                                styles={{
                                    listView: {
                                        height: '200',
                                        overflow: 'scroll',
                                        marginLeft: -50,
                                        maxHeight: 200,
                                        zIndex: 40,
                                    },
                                    container: {
                                        marginLeft: -20,
                                    },
                                }}
                            />
                        </View>
                    </VStack>
                </Center>
            </View>
            <Center w="100%">
                <View
                    w="95%"
                    h="full"
                    style={{
                        position: 'relative',
                        zIndex: 10,
                    }}>
                    <View
                        w="full"
                        h="54%"
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            zIndex: 12,
                        }}>
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={styles.map}
                            ref={mapRef}
                            onPoiClick={event => {
                                const {coordinate, placeId, name} =
                                    event.nativeEvent;
                                setDestinationRegion({
                                    latitude: coordinate.latitude,
                                    longitude: coordinate.longitude,
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
                        </MapView>
                        <Center
                            style={{
                                position: 'absolute',
                                width: '100%',
                                bottom: 0,
                            }}>
                            <Button borderRadius={20}>Tìm Kiếm Tài Xế</Button>
                        </Center>
                    </View>
                </View>
            </Center>
        </>
    );
};
