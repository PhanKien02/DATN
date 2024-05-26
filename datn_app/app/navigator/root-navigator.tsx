import StartScreen from '../screens/start-screen';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login-screen';
import {screens} from './screenName';
import RegisterScreen from '../screens/register-screen';
import {HomeTab} from './home-navigator';
import VerifyOTP from '../screens/verifyOTP';
import {RootState, useAppSelector} from '../models/root-store/root-store';
import {UserRoles} from '../models/enums/userRoles';
import {DriverTab} from './driver-navigator';
const Stack = createNativeStackNavigator();
const RootStack = ({initialRouteName}) => {
    const {user} = useAppSelector((state: RootState) => state.auth);
    const role = user?.roleName;

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={initialRouteName}>
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
            {role === UserRoles.USER ? (
                <Stack.Screen
                    name={screens.home}
                    component={HomeTab}
                    options={{
                        headerShown: false,
                    }}
                />
            ) : (
                <Stack.Screen
                    name={screens.home}
                    component={DriverTab}
                    options={{
                        headerShown: false,
                    }}
                />
            )}
        </Stack.Navigator>
    );
};
export const RootNavigator = () => {
    const {user, token} = useAppSelector((state: RootState) => state.auth);
    const initScreen = user && token ? screens.home : screens.start;
    return (
        <NavigationContainer>
            <RootStack initialRouteName={initScreen} />
        </NavigationContainer>
    );
};
