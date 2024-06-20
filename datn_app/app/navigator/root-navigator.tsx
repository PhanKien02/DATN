import StartScreen from '../screens/start-screen';
import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login-screen';
import {screens} from './screenName';
import RegisterScreen from '../screens/register-screen';
import {HomeTab} from './home-navigator';
import VerifyOTP from '../screens/verifyOTP';
import {
    RootState,
    useAppDispatch,
    useAppSelector,
} from '../models/root-store/root-store';
import {UserRoles} from '../models/enums/userRoles';
import {DriverTab} from './driver-navigator';
import {setUpRootStore} from '../models/root-store/setUp';
import {SETUP} from '../models/auth-slice';
import {Loading} from '../components/Loading';
import {ProfileScreen} from '../screens/profile-screen';
import {Alert, Button} from 'native-base';
const Stack = createNativeStackNavigator();
const RootStack = ({initScreen}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={initScreen}>
            <Stack.Screen
                name={screens.start}
                component={StartScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={screens.login}
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={screens.register}
                component={RegisterScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={screens.verifyOTP}
                component={VerifyOTP}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={screens.home}
                component={HomeTab}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={screens.driver}
                component={DriverTab}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={screens.profile}
                component={ProfileScreen}
                options={{
                    headerShown: true,
                    title: 'Thông tin cá nhân',
                }}
            />
        </Stack.Navigator>
    );
};
const NaviagaterContainer = () => {
    const navigationRef = useRef(null);
    const {user} = useAppSelector((state: RootState) => state.auth);
    const role = user?.roleName;

    const [initScreen, setInitScreen] = useState('');
    useEffect(() => {
        if (role === UserRoles.DRIVER) {
            setInitScreen(screens.driver);
            navigationRef?.current?.navigate(screens.driver);
        } else if (role === UserRoles.USER) {
            setInitScreen(screens.home);
            navigationRef?.current?.navigate(screens.home);
        } else setInitScreen(screens.start);
    }, [role]);
    return navigationRef && initScreen ? (
        <NavigationContainer ref={navigationRef}>
            <RootStack initScreen={initScreen} />
        </NavigationContainer>
    ) : (
        <Loading />
    );
};
export const RootNavigator = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        setUpRootStore()
            .then(({user, token}) => {
                user && token && dispatch(SETUP({user, token}));
            })
            .catch(er => {
                console.log('Error', er);
            });
    }, []);
    return <NaviagaterContainer />;
};
