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
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
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
                    <Toast
                        config={{
                            success: props => (
                                <BaseToast
                                    {...props}
                                    style={{borderLeftColor: 'green'}}
                                    text1Style={{
                                        fontWeight: 'bold',
                                    }}
                                    text2Style={{
                                        fontSize: 16,
                                    }}
                                    text2NumberOfLines={4} // Cho phép nhiều dòng cho văn bản text2
                                    text1NumberOfLines={4}
                                />
                            ),
                            error: props => (
                                <ErrorToast
                                    {...props}
                                    style={{borderLeftColor: 'red'}}
                                    text1Style={{
                                        fontWeight: 'bold',
                                    }}
                                    text2Style={{
                                        fontSize: 16,
                                    }}
                                    text2NumberOfLines={4} // Cho phép nhiều dòng cho văn bản text2
                                    text1NumberOfLines={4}
                                />
                            ),
                        }}
                        autoHide
                        visibilityTime={1500}
                        position="top"
                    />
                </SafeAreaProvider>
            </Provider>
        </NativeBaseProvider>
    );
}

export default App;
