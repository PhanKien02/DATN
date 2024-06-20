import {Box, Button, Center, Image, Text, View} from 'native-base';
import React from 'react';
import {screens} from '../navigator/screenName';
function StartScreen({navigation}: any) {
    return (
        <View
            style={{
                flexDirection: 'column',
                height: '100%',
                alignItems: 'center',
            }}>
            <Center>
                <Image
                    source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/datn-44ee0.appspot.com/o/logo.png?alt=media&token=d30f6c0b-3b9b-412f-aaaa-0c07456045cb',
                    }}
                    alt="Logo"
                    size="2xl"
                    borderRadius={100}
                    style={{
                        marginTop: '30%',
                    }}
                />
                <Box alignItems="center" marginTop={150}>
                    <Button
                        backgroundColor="#FBC632"
                        width="330"
                        borderRadius="full"
                        style={{
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 15,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 15.0,
                            elevation: 6,
                        }}
                        shadow="9"
                        onPress={() => {
                            navigation.navigate(screens.login);
                        }}>
                        <Text fontWeight="bold" fontSize="lg" color="white">
                            Đăng Nhập
                        </Text>
                    </Button>
                    <Button
                        width="330"
                        marginTop="5"
                        backgroundColor="#f3f3f3"
                        shadow={9}
                        style={{
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 15,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 15.0,

                            elevation: 6,
                        }}
                        borderRadius="full"
                        onPress={() => {
                            navigation.navigate(screens.register);
                        }}>
                        <Text fontWeight="bold" fontSize="lg" color="black">
                            Đăng ký
                        </Text>
                    </Button>
                </Box>
            </Center>
        </View>
    );
}

export default StartScreen;
