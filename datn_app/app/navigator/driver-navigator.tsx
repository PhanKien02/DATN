import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {screens} from './screenName';
import SvgHomeTab from '../components/icons/homeTab';
import SvgNotificationIcon from '../components/icons/notification';
import {NotificationScreen} from '../screens/notification-screen';
import {UserScreen} from '../screens/user-screen';
import SvgUserProfile from '../components/icons/userProfile';
import {StatusBar} from 'native-base';
import {IncomeScreen} from '../screens/incom-screen';
import SVGIncomeTab from '../components/icons/income';
import {DriverHomeScreen} from '../screens/driver-home-screen';
import {useAppSelector} from '../models/root-store/root-store';
import {requestLocationPermission} from '../utils/permissions';
import {getCurrentPosition} from '../utils/location';
import {AnimatedRegion} from 'react-native-maps';
import {
    useRejectBookingMutation,
    useTrackingLocationDriverMutation,
} from '../services/api';
import {Alert} from 'react-native';
import {openSettings} from 'react-native-permissions';
import backgroundServer from 'react-native-background-actions';
import {useEffect, useState} from 'react';
import BackgroundService from 'react-native-background-actions';
import notifee, {AndroidImportance} from '@notifee/react-native';
import Firebase from '../utils/firebase';
import Toast from 'react-native-toast-message';
import {StartBookingModal} from '../components/modal/startBookingModal';
const Tab = createBottomTabNavigator();

const sleep = (time: any) =>
    new Promise<void>(resolve => setTimeout(() => resolve(), time));

const options = {
    taskName: 'Tracking location',
    taskTitle: 'Tracking ',
    taskDesc: 'ExampleTask desc',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'exampleScheme://chat/jane',
    parameters: {
        delay: 1000 * 60 * 5,
    },
};

export const DriverTab = () => {
    const user = useAppSelector(state => state.auth.user);
    const [rejectBooking] = useRejectBookingMutation();
    const [tracking] = useTrackingLocationDriverMutation();
    const [openBooking, setOpenBooking] = useState(false);
    const [bookingId, setBookingId] = useState<number>();
    const getLiveLocation = async () => {
        const locPermissionDenied = await requestLocationPermission();
        if (locPermissionDenied.success) {
            const {latitude, longitude} = await getCurrentPosition();
            new AnimatedRegion({latitude, longitude});
            tracking({
                id: user.id,
                lat: latitude,
                long: longitude,
            });
        } else {
            Alert.alert(
                '',
                'Driver Service yêu cầu quyền truy cập vị trí của bạn',
                [{text: 'Cài đặt', onPress: openSettings}],
            );
        }
    };

    const trackingLocation = async (taskData: any) => {
        const {delay} = taskData;
        while (backgroundServer.isRunning()) {
            // Perform your work here (e.g., fetch location and send to server)
            await getLiveLocation().then(() => console.log('tracking'));
            await sleep(delay);
        }
    };

    useEffect(() => {
        try {
            BackgroundService.start(trackingLocation, options);
            console.log('Successful start!');
        } catch (e) {
            console.log('Error', e);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = Firebase.onMessage(async dataCallBack => {
            await notifee.deleteChannel('important');
            // Create a channel
            const channelId = await notifee.createChannel({
                id: 'important',
                name: 'Important Notifications',
                importance: AndroidImportance.HIGH,
                sound: 'default',
            });
            try {
                // Display a notification
                notifee.displayNotification({
                    title: `${dataCallBack.notification.title}`,
                    subtitle: '',
                    body: dataCallBack.notification.body,
                    data: dataCallBack.data,
                    android: {
                        channelId,
                        color: '#FF8A00',
                        importance: AndroidImportance.HIGH,
                        actions: [
                            {
                                title: '<b>Chấp Nhận</b>',
                                pressAction: {
                                    id: 'approve',
                                },
                            },
                            {
                                title: '<b>Từ Chối</b>',
                                pressAction: {
                                    id: 'reject',
                                },
                            },
                        ],
                        sound: 'default',
                        autoCancel: false,
                    },
                    ios: {
                        sound: 'local.wav',
                    },
                });
            } catch (e) {
                console.error(e);
            }
        });

        notifee.onForegroundEvent(event => {
            const action = event.detail.pressAction;
            if (action) {
                const data =
                    event.detail.notification.data.bookingId.toString();
                if (action.id === 'reject') {
                    rejectBooking({
                        bookingId: +data,
                        driverId: user.id,
                    }).then(() => {
                        Toast.show({
                            type: 'success',
                            text1: 'Bạn Đã Từ Chối Cuốc Xe',
                        });
                    });
                } else {
                    setBookingId(+data);
                    setOpenBooking(true);
                }
            }
        });
        return unsubscribe;
    }, []);
    return (
        <>
            {bookingId && user && (
                <StartBookingModal
                    open={openBooking}
                    setOpen={setOpenBooking}
                    bookingId={bookingId}
                    driverId={user.id}
                />
            )}
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="#FBC632"
            />
            <Tab.Navigator>
                <Tab.Screen
                    name={screens.index}
                    component={DriverHomeScreen}
                    options={{
                        tabBarIcon: () => {
                            return <SvgHomeTab />;
                        },
                        title: '',
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name={screens.income}
                    component={IncomeScreen}
                    options={{
                        tabBarIcon: () => {
                            return <SVGIncomeTab />;
                        },
                        title: '',
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name={screens.notification}
                    component={NotificationScreen}
                    options={{
                        tabBarIcon: () => {
                            return <SvgNotificationIcon />;
                        },
                        title: '',
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name={screens.user}
                    component={UserScreen}
                    options={{
                        tabBarIcon: () => {
                            return <SvgUserProfile />;
                        },
                        title: '',
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        </>
    );
};
