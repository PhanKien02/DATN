import {
    Button,
    Center,
    FormControl,
    Image,
    Input,
    ScrollView,
    Text,
    VStack,
} from 'native-base';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {screens} from '../navigator/screenName';
import {isEmail} from '../utils/helpers';
import {useLoginMutation} from '../services/api';
import {Loading} from '../components/Loading';
import {useAppDispatch} from '../models/root-store/root-store';
import Toast from 'react-native-toast-message';
import {LOGIN} from '../models/auth-slice';
import {save, saveString} from '../utils/storage';
import {KeyAsyncStorage} from '../constants/asyncStorage';
function LoginScreen({navigation}) {
    const [login, {isLoading, data, error}] = useLoginMutation();
    const dispath = useAppDispatch();
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = data => {
        login(data)
            .unwrap()
            .then(payload => {
                const auth = {
                    user: payload.user,
                    token: payload.token.token,
                };
                dispath(LOGIN(auth));
                saveString(KeyAsyncStorage.TOKEN, payload.token.token);
                save(KeyAsyncStorage.USER, payload.user);
                Toast.show({
                    type: 'success',
                    text1: `Chúc Mừng ${payload.user.fullName} Đã Đăng Nhập Tài Khoản Thành Công`,
                });
                if (payload.user.activated)
                    navigation.reset({
                        index: 0,
                        routes: [{name: screens.home}],
                    });
                else
                    navigation.navigate(screens.verifyOTP, {
                        email: payload.user.email,
                        fullName: payload.user.fullName,
                    });
            })
            .catch(error => console.error('rejected', error));
    };

    return (
        <ScrollView>
            <Center>
                <Image
                    source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/datn-44ee0.appspot.com/o/logo.png?alt=media&token=d30f6c0b-3b9b-412f-aaaa-0c07456045cb',
                    }}
                    alt="Logo"
                    size="2xl"
                    borderRadius={100}
                />
                <VStack marginTop={30}>
                    <Text
                        fontWeight="bold"
                        fontSize="2xl"
                        color="black"
                        width="full"
                        textAlign="left"
                        alignItems="start"
                        marginBottom="2">
                        Đăng Nhập
                    </Text>
                    <FormControl isRequired isInvalid={'email' in errors}>
                        <FormControl.Label>Email</FormControl.Label>
                        <Controller
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <Input
                                    onBlur={onBlur}
                                    placeholder="Nhập Email"
                                    onChangeText={val => onChange(val)}
                                    value={value}
                                    my="2"
                                    w="90%"
                                    borderRadius="20"
                                    type="text"
                                />
                            )}
                            name="email"
                            rules={{
                                required: 'Vui Lòng Nhập Email',
                                validate: value =>
                                    isEmail(value) || 'Invalid email format',
                            }}
                        />
                        <FormControl.ErrorMessage>
                            {errors?.email?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={'password' in errors}>
                        <FormControl.Label>Password</FormControl.Label>
                        <Controller
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <Input
                                    onBlur={onBlur}
                                    placeholder="Nhập Mật Khẩu"
                                    onChangeText={val => onChange(val)}
                                    value={value}
                                    my="2"
                                    w="90%"
                                    borderRadius="20"
                                    type="password"
                                />
                            )}
                            name="password"
                            rules={{
                                required: 'Vui Lòng Nhập Mật Khẩu',
                                minLength: {
                                    value: 6,
                                    message: 'Mật Khẩu Tối Thiểu 6 Ký Tự',
                                },
                            }}
                        />
                        <FormControl.ErrorMessage>
                            {errors.password?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Center>
                        {error && (
                            <Text color="red.600">
                                {error['data']?.message || 'Đăng Nhập THất Bại'}
                            </Text>
                        )}
                        <Button
                            alignItems="center"
                            backgroundColor="#FBC632"
                            width="330"
                            marginTop={5}
                            marginBottom={20}
                            borderRadius="full"
                            style={{
                                shadowOffset: {
                                    width: 0,
                                    height: 15,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 15.0,

                                elevation: 6,
                            }}
                            shadow="9"
                            disabled={isLoading}
                            onPress={handleSubmit(onSubmit)}>
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <Text
                                    fontWeight="bold"
                                    fontSize="lg"
                                    color="white">
                                    Đăng Nhập
                                </Text>
                            )}
                        </Button>
                    </Center>
                </VStack>
            </Center>
        </ScrollView>
    );
}

export default LoginScreen;
