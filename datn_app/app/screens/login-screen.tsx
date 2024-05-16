import {
    Alert,
    Button,
    Center,
    FormControl,
    Image,
    Input,
    Text,
    VStack,
    View,
} from 'native-base';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {screens} from '../navigator/screenName';
import {isEmail} from '../utils/helpers';
import {useLoginMutation} from '../services/api';
import {Loading} from '../components/Loading';
function LoginScreen({navigation}) {
    const [login, {isLoading, data, error}] = useLoginMutation();
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
        console.log({data});
        login(data)
            .unwrap()
            .then(payload => console.log('fulfilled', payload))
            .catch(error => console.error('rejected', error));
    };
    console.log({isLoading, data, error});

    return (
        <View>
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
                        <FormControl.Label>First Name</FormControl.Label>
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
                            {errors.email?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={'password' in errors}>
                        <FormControl.Label>First Name</FormControl.Label>
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
                            <Text color="red.600">{error['data'].message}</Text>
                        )}
                        <Button
                            alignItems="center"
                            backgroundColor="#FBC632"
                            width="330"
                            marginTop={5}
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
        </View>
    );
}

export default LoginScreen;
