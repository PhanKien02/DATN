import {Button, Center, Image, Text, VStack, View} from 'native-base';
import Toast from 'react-native-toast-message';
import React, {useEffect, useState} from 'react';
import {screens} from '../navigator/screenName';
import OTPTextView from 'react-native-otp-textinput';
import {Loading} from '../components/Loading';
import {useResendOTPMutation, useVerifyOTPMutation} from '../services/api';
import {useAppSelector, RootState} from '../models/root-store/root-store';
const OTP_LIMIT = 60;
function VerifyOTP({route, navigation}: any) {
    const [verify, {isLoading: isLoadingVerify, error: errorVerify}] =
        useVerifyOTPMutation();
    const [resend, {error: errorResend}] = useResendOTPMutation();
    const {email, fullName} = route.params;
    const [otp, setOtp] = useState('');
    const [seconds, setSeconds] = useState(OTP_LIMIT);
    const {user} = useAppSelector((state: RootState) => state.auth);
    useEffect(() => {
        let timer = null;
        timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
        }, 1000);

        // clearing interval
        return () => {
            timer !== null && clearInterval(timer);
        };
    });
    const numDigits = 6; // Replace with your desired number
    const onSubmit = () => {
        if (otp == '')
            return Toast.show({
                type: 'error',
                text1: `Vui Lòng Nhập Mã OTP`,
            });
        verify({email, otp})
            .unwrap()
            .then(res => {
                Toast.show({
                    type: 'success',
                    text1: `Chúc Mừng ${fullName} Đã Kích Hoạt Tài Khoản Thành Công`,
                    text2: 'Vui Lòng Đăng Nhập',
                });
                navigation.navigate(screens.login);
            })
            .catch(err => {
                Toast.show({
                    type: 'error',
                    text1: `${
                        errorVerify
                            ? errorVerify['data'].message
                            : 'Xác Thực Tài Khoản Thất Bại'
                    }`,
                });
            });
    };
    const resendOTP = () => {
        resend({email})
            .unwrap()
            .then(res => {
                Toast.show({
                    type: 'success',
                    text1: `Vui Lòng Kiểm Tra Email`,
                });
            })
            .catch(error => {
                Toast.show({
                    type: 'error',
                    text1: `${
                        errorResend
                            ? errorResend['data'].message
                            : 'Đã Có Lỗi Hệ Thống Vui Lòng Thử Lại'
                    }`,
                });
            });
    };
    useEffect(() => {
        if (user) resendOTP();
    }, [user]);
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
                <Center w="90%">
                    <Text fontSize="sm" marginBottom="2">
                        Vui lòng kiểm tra email để nhận mã OTP.
                    </Text>
                </Center>
                <Center>
                    <OTPTextView
                        inputCount={numDigits}
                        keyboardType="numeric"
                        handleTextChange={code => setOtp(code)}
                        textInputStyle={{borderRadius: 10, borderWidth: 4}}
                    />
                </Center>
                <Button
                    alignItems="center"
                    colorScheme={seconds > 0 ? 'text' : 'danger'}
                    width="90%"
                    borderRadius="20"
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
                    onPress={resendOTP}
                    disabled={seconds > 0}>
                    <Text
                        w="100%"
                        fontWeight="bold"
                        fontSize="md"
                        color="white">
                        Gửi Lại OTP
                        {seconds > 0 && <Text> ({seconds.toString()})</Text>}
                    </Text>
                </Button>
                <Button
                    alignItems="center"
                    backgroundColor="#FBC632"
                    width="90%"
                    borderRadius="20"
                    style={{
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 15,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 15.0,
                        elevation: 6,
                        marginTop: 5,
                    }}
                    shadow="9"
                    disabled={isLoadingVerify}
                    onPress={onSubmit}>
                    {isLoadingVerify ? (
                        <Loading />
                    ) : (
                        <Text fontWeight="bold" fontSize="md" color="white">
                            OK
                        </Text>
                    )}
                </Button>
            </Center>
        </VStack>
    );
}

export default VerifyOTP;
