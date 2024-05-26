import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/home-screen';
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
const Tab = createBottomTabNavigator();

export const DriverTab = () => {
    return (
        <>
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
