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
function App() {
    useEffect(() => {
        SplashScreen.hide();
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
                </SafeAreaProvider>
            </Provider>
        </NativeBaseProvider>
    );
}

export default App;
