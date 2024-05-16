import {
    Box,
    Button,
    Center,
    FormControl,
    Image,
    Input,
    Text,
    View,
    Select,
    HStack,
    VStack,
    ScrollView,
} from 'native-base';
import React from 'react';
import {UserRoles} from '../models/enums/userRoles';
import {Controller, useForm} from 'react-hook-form';
import {isEmail} from '../utils/helpers';
import {useRegisterMutation} from '../services/api';
import {Loading} from '../components/Loading';
function RegisterScreen() {
    const [register, {isLoading, error, data}] = useRegisterMutation();
    const {
        control,
        watch,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPass: '',
            fullName: '',
            roleName: UserRoles.USER,
        },
    });
    const onSubmit = data => {
        const {email, fullName, password, roleName} = data;
        register({email, fullName, password, roleName})
            .unwrap()
            .then(res => console.log({response: res}))
            .catch(error => console.log(error));
    };
    return (
        <ScrollView w="full" flexDir="column">
            <Center w="90%" mx={4}>
                <Image
                    source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/datn-44ee0.appspot.com/o/logo.png?alt=media&token=d30f6c0b-3b9b-412f-aaaa-0c07456045cb',
                    }}
                    alt="Logo"
                    size="2xl"
                    borderRadius={100}
                    marginTop="60"
                />
                <VStack
                    style={{
                        width: '100%',
                    }}>
                    <Text
                        fontWeight="bold"
                        fontSize="2xl"
                        color="black"
                        width="full"
                        textAlign="left"
                        alignItems="start"
                        marginBottom="2">
                        Đăng Ký
                    </Text>
                    <FormControl isRequired isInvalid={'fullName' in errors}>
                        <FormControl.Label>Họ Và Tên</FormControl.Label>
                        <Controller
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <Input
                                    onBlur={onBlur}
                                    placeholder="Nhập Họ Và Tên"
                                    onChangeText={val => onChange(val)}
                                    value={value}
                                    my="2"
                                    width={370}
                                    borderRadius="20"
                                    type="text"
                                />
                            )}
                            name="fullName"
                            rules={{
                                required: 'Vui Lòng Nhập Họ Và Tên',
                            }}
                        />
                        <FormControl.ErrorMessage>
                            {errors.email?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
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
                                    width={370}
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
                        <FormControl.Label>Mật Khẩu</FormControl.Label>
                        <Controller
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <Input
                                    onBlur={onBlur}
                                    placeholder="Nhập Mật Khẩu"
                                    onChangeText={val => onChange(val)}
                                    value={value}
                                    my="2"
                                    width={370}
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
                    <FormControl isRequired isInvalid={'confirmPass' in errors}>
                        <FormControl.Label>Nhập Lại Mật Khẩu</FormControl.Label>
                        <Controller
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <Input
                                    onBlur={onBlur}
                                    placeholder="Nhập Lại Mật Khẩu"
                                    onChangeText={val => onChange(val)}
                                    value={value}
                                    my="2"
                                    width={370}
                                    borderRadius="20"
                                    type="password"
                                />
                            )}
                            name="confirmPass"
                            rules={{
                                required: 'Vui Lòng Nhập Mật Khẩu',
                                minLength: {
                                    value: 6,
                                    message: 'Mật Khẩu Tối Thiểu 6 Ký Tự',
                                },
                                validate: value =>
                                    value === watch('password') ||
                                    'Mật Khẩu Không Trùng Khớp',
                            }}
                        />
                        <FormControl.ErrorMessage>
                            {errors.confirmPass?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>
                            Đăng Ký Với Vai Trò
                        </FormControl.Label>
                        <Controller
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <Select
                                    borderRadius="20"
                                    width={370}
                                    onValueChange={(itemValue: string) => {
                                        onChange(itemValue);
                                    }}
                                    selectedValue={value}
                                    placeholder="Chọn Vai Trò">
                                    <Select.Item
                                        label="Tài Xế"
                                        value={UserRoles.DRIVER}
                                    />
                                    <Select.Item
                                        label="Người Dùng"
                                        value={UserRoles.USER}
                                    />
                                </Select>
                            )}
                            name="roleName"
                            rules={{
                                required: 'Vui Lòng Chọn Vài Trò Muốn Đăng Ký',
                            }}
                        />
                        <FormControl.ErrorMessage>
                            {errors.password?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    {error && (
                        <Center>
                            <Text color="red.600" my={2}>
                                {error['data'].message}
                            </Text>
                        </Center>
                    )}
                </VStack>
                <Button
                    alignItems="center"
                    backgroundColor="#FBC632"
                    width="330"
                    marginTop={5}
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
                    onPress={handleSubmit(onSubmit)}>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <Text fontWeight="bold" fontSize="lg" color="white">
                            Đăng Ký
                        </Text>
                    )}
                </Button>
            </Center>
        </ScrollView>
    );
}

export default RegisterScreen;
