import {Button, Center, Image, Text, VStack, View} from 'native-base';
import React, {RefObject, useRef, useState} from 'react';
import {screens} from '../navigator/screenName';
import OTPTextView from 'react-native-otp-textinput';
import {Loading} from '../components/Loading';
import {useRegisterMutation} from '../services/api';

function VerifyOTP({navigation}: any) {
    const [register, {isLoading, error, data}] = useRegisterMutation();
    const [otp, setOtp] = useState('');
    const numDigits = 6; // Replace with your desired number
    return (
        <VStack>
            <Center>
                <Image
                    source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/datn-44ee0.appspot.com/o/logo.png?alt=media&token=d30f6c0b-3b9b-412f-aaaa-0c07456045cb',
                    }}
                    alt="Logo"
                    size="2xl"
                    borderRadius={100}
                    marginTop="60"
                />
                <OTPTextView
                    inputCount={numDigits}
                    keyboardType="numeric"
                    handleTextChange={code => setOtp(code)}
                    textInputStyle={{borderRadius: 10, borderWidth: 4}}
                />
                <Button
                    alignItems="center"
                    backgroundColor="#FBC632"
                    width="sm"
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
                        marginTop: 50,
                    }}
                    shadow="9"
                    onPress={() => {}}>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <Text fontWeight="bold" fontSize="lg" color="white">
                            OK
                        </Text>
                    )}
                </Button>
            </Center>
        </VStack>
    );
}

export default VerifyOTP;
