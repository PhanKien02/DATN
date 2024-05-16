import StartScreen from '../screens/start-screen';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login-screen';
import {screens} from './screenName';
import RegisterScreen from '../screens/register-screen';
import {HomeTab} from './home-navigator';
import VerifyOTP from '../screens/verifyOTP';

const Stack = createNativeStackNavigator();
const RootStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={screens.verifyOTP}>
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
        </Stack.Navigator>
    );
};
export const RootNavigator = () => {
    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    );
};
