import {Avatar, Button, Flex, Text, VStack, View} from 'native-base';
import {useAppSelector} from '../models/root-store/root-store';
import SVGPowerOff from '../components/icons/powerOff';
import {clear} from '../utils/storage';
import {screens} from '../navigator/screenName';
import Toast from 'react-native-toast-message';

export const UserScreen = ({navigation}) => {
    const user = useAppSelector(state => state.auth);
    const handleLogout = () => {
        clear().then(() => {
            navigation.navigate(screens.start);
            Toast.show({
                type: 'info',
                text1: 'Bạn Đã Đăng Xuất',
                position: 'bottom',
            });
        });
    };
    return (
        <>
            <VStack w="full" h="full" margin={0}>
                <Flex
                    direction="row"
                    backgroundColor="#FBC632"
                    h={'20%'}
                    alignItems="center"
                    style={{gap: 5}}>
                    <Avatar
                        bg="green.500"
                        ml={2}
                        w={20}
                        h={20}
                        source={{
                            uri:
                                user.user.avatar ||
                                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                        }}
                    />
                    <VStack>
                        <Text fontSize="sm" color="#fff">
                            {user.user.fullName}
                        </Text>
                        <Text fontSize="xs" color="#fff">
                            {user.user.email}
                        </Text>
                    </VStack>
                    <Button
                        backgroundColor="#fff"
                        borderRadius="full"
                        style={{
                            position: 'absolute',
                            right: 4,
                            backgroundColor: '#f43',
                        }}
                        onPress={handleLogout}>
                        <SVGPowerOff />
                    </Button>
                </Flex>
            </VStack>
        </>
    );
};
