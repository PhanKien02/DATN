import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/home-screen';
import {screens} from './screenName';
import SvgHomeTab from '../components/icons/homeTab';
const Tab = createBottomTabNavigator();

export const HomeTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name={screens.home}
                component={HomeScreen}
                options={{
                    tabBarIcon: () => {
                        return <SvgHomeTab />;
                    },
                    title: '',
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};
