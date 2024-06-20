import {
    Avatar,
    Button,
    Flex,
    HStack,
    ScrollView,
    Text,
    VStack,
    View,
} from 'native-base';
import {useAppSelector} from '../models/root-store/root-store';
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
            <View w="full" h="full" margin={0}>
                <Flex
                    direction="row"
                    backgroundColor="#FBC632"
                    h={'20%'}
                    alignItems="center"
                    style={{gap: 5}}>
                    <Avatar
                        ml={2}
                        w={20}
                        h={20}
                        source={{
                            uri: user.user && user.user.avatar,
                        }}>
                        <Text color="white" fontSize={40}>
                            {user.user &&
                                user.user.fullName &&
                                user.user.fullName[0]}
                        </Text>
                    </Avatar>
                    <VStack ml={3}>
                        <Text fontSize="sm" fontWeight="bold" color="#fff">
                            {user.user ? user.user.fullName : ''}
                        </Text>
                        <Text fontSize="xs" color="#fff">
                            {user.user ? user.user.email : ''}
                        </Text>
                    </VStack>
                </Flex>
                <ScrollView borderTopColor="gray.300" borderTopWidth={8}>
                    <HStack
                        mt={3}
                        ml={5}
                        // h={10}
                        mr={3}
                        w="full"
                        borderBottomWidth={2}
                        borderBottomColor="gray.400"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <Text fontSize={16} color="gray.600">
                            Tài khoản & Bảo mật
                        </Text>
                    </HStack>
                    <HStack
                        mt={8}
                        ml={5}
                        h={10}
                        mr={3}
                        w="full"
                        borderBottomWidth={2}
                        borderBottomColor="gray.400"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <Text
                            fontSize={16}
                            color="gray.600"
                            onPress={() =>
                                navigation.navigate(screens.profile)
                            }>
                            Thông tin cá nhân
                        </Text>
                    </HStack>
                    <HStack
                        mt={8}
                        ml={5}
                        h={10}
                        mr={3}
                        w="full"
                        borderBottomWidth={2}
                        borderBottomColor="gray.400"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <Text fontSize={16} color="gray.600">
                            Cài đặt riêng tư
                        </Text>
                    </HStack>
                    <HStack
                        mt={8}
                        ml={5}
                        h={10}
                        mr={3}
                        w="full"
                        borderBottomWidth={2}
                        borderBottomColor="gray.400"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <Text fontSize={16} color="gray.600">
                            Cài đặt thông báo
                        </Text>
                    </HStack>
                    <HStack
                        mt={8}
                        ml={5}
                        h={10}
                        mr={3}
                        w="full"
                        borderBottomWidth={2}
                        borderBottomColor="gray.400"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <Text fontSize={16} color="gray.600">
                            Điểu khoản
                        </Text>
                    </HStack>
                    <HStack
                        mt={8}
                        ml={5}
                        h={10}
                        mr={3}
                        w="full"
                        borderBottomWidth={2}
                        borderBottomColor="gray.400"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <Text fontSize={16} color="gray.600">
                            Trung tâm trợ giúp
                        </Text>
                    </HStack>
                    <HStack
                        mt={8}
                        ml={5}
                        h={10}
                        mr={3}
                        w="full"
                        borderBottomWidth={2}
                        borderBottomColor="gray.400"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <Text fontSize={16} color="gray.600">
                            Giới Thiệu
                        </Text>
                    </HStack>
                    <View backgroundColor={'gray.200'} mt={-1}>
                        <HStack
                            w="full"
                            mb={10}
                            mt={10}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                            <Button
                                variant="outline"
                                borderWidth={2}
                                width={40}
                                borderColor="gray.400"
                                colorScheme="secondary"
                                fontSize={16}
                                onPress={handleLogout}>
                                Đăng Xuất
                            </Button>
                        </HStack>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};
