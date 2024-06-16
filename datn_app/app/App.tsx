// In App.js in a new project

import * as React from 'react';
import {RootNavigator} from './navigator/root-navigator';
import {NativeBaseProvider, StatusBar, theme} from 'native-base';
import {
    SafeAreaProvider,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {store} from './models/root-store/root-store';
import {Provider} from 'react-redux';
import {useEffect} from 'react';
import Toast, {
    BaseToast,
    ErrorToast,
    InfoToast,
} from 'react-native-toast-message';
import messaging, {
    firebase,
    FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import Firebase from './utils/firebase';
import {enableScreens} from 'react-native-screens';

function App() {
    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    const handleDetail = data => {
        console.log('see detail', data);
    };

    const listenNotification = () => {
        Firebase.getInitialNotification(handleDetail);
        // Firebase.setBackgroundMessageHandler()
        Firebase.onNotificationOpenedApp(handleDetail);
    };
    enableScreens();
    useEffect(() => {
        (async () => {
            requestUserPermission().then();
            listenNotification();
        })();
        SplashScreen.hide();
    }, []);

    firebase
        .messaging()
        .setBackgroundMessageHandler(
            async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
                // Increment the count by 1
                await notifee.incrementBadgeCount();
            },
        );

    useEffect(() => {
        listenNotification();
        // iOS > 12
        notifee.requestPermission({
            criticalAlert: true,
        });
    }, []);

    return (
        <NativeBaseProvider theme={theme}>
            <Provider store={store}>
                <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                    <StatusBar
                        barStyle="dark-content"
                        hidden={false}
                        backgroundColor="#fff"
                    />
                    <RootNavigator />
                    <Toast
                        config={{
                            success: props => (
                                <BaseToast
                                    {...props}
                                    style={{
                                        backgroundColor: 'green',
                                        borderLeftColor: 'green',
                                    }}
                                    text1Style={{
                                        fontWeight: 'bold',
                                        color: '#fff',
                                    }}
                                    text2Style={{
                                        fontSize: 16,
                                        color: '#fff',
                                    }}
                                    text2NumberOfLines={4}
                                    text1NumberOfLines={4}
                                />
                            ),
                            error: props => (
                                <ErrorToast
                                    {...props}
                                    style={{
                                        backgroundColor: 'red',
                                        borderLeftColor: 'red',
                                    }}
                                    text1Style={{
                                        fontWeight: 'bold',
                                        color: '#fff',
                                    }}
                                    text2Style={{
                                        fontSize: 16,
                                        color: '#fff',
                                    }}
                                    text2NumberOfLines={4}
                                    text1NumberOfLines={4}
                                />
                            ),
                            info: props => (
                                <InfoToast
                                    {...props}
                                    style={{
                                        backgroundColor: '#13e5ed',
                                        height: 40,
                                        borderLeftColor: '#13e5ed',
                                    }}
                                    text1Style={{
                                        fontWeight: 'bold',
                                        color: '#fff',
                                    }}
                                    text2Style={{
                                        fontSize: 16,
                                        color: '#fff',
                                    }}
                                    text2NumberOfLines={4}
                                    text1NumberOfLines={4}
                                />
                            ),
                        }}
                        autoHide
                        visibilityTime={3000}
                        position="top"
                    />
                </SafeAreaProvider>
            </Provider>
        </NativeBaseProvider>
    );
}

export default App;
