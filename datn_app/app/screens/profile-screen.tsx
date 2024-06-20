import {
    Avatar,
    Button,
    Center,
    FormControl,
    Input,
    ScrollView,
    Select,
    Text,
    VStack,
    View,
} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useGetProfileQuery, useUpdateProfileMutation} from '../services/api';
import {Loading} from '../components/Loading';
import {IUser} from '../interface/user';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {isEmail, isPhone} from '../utils/helpers';
import {formatDate} from '../utils/formatDate';
import {UserRoles} from '../models/enums/userRoles';
import Toast from 'react-native-toast-message';

export const ProfileScreen = ({navigation}) => {
    const {data, isLoading, refetch} = useGetProfileQuery({});
    const [useUpdateProfile] = useUpdateProfileMutation();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dob, setDob] = useState<Date>();
    const [user, setUser] = useState<IUser>();
    useEffect(() => {
        data && setUser(data);
    }, [data]);
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: user
            ? {
                  ...user,
                  gender: `${user.gender}`,
                  dob: formatDate(user.dob).toString(),
              }
            : undefined,
    });
    const onSubmit = data => {
        console.log({data});

        const {email, fullName, gender, phone} = data;
        useUpdateProfile({
            email,
            fullName,
            gender: gender == 'true' ? true : gender == 'false' ? false : null,
            phone,
            dob,
            id: user.id,
        })
            .then(() => {
                refetch();
                Toast.show({
                    type: 'success',
                    text2: 'Cập nhật thông tin thành công',
                });
            })
            .catch(() => {
                Toast.show({
                    type: 'error',
                    text2: 'Cập nhật thông tin thất bại',
                });
            });
    };
    console.log(user);

    return (
        <>
            {isLoading || !user ? (
                <Loading />
            ) : (
                <ScrollView w="full" h="full" margin={0}>
                    <View
                        h={'40'}
                        w={'full'}
                        style={{
                            backgroundColor: '#FBC632',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Avatar
                            bg="lightBlue.400"
                            source={{
                                uri: user.avatar ? user.avatar : undefined,
                            }}
                            size="xl">
                            <Avatar.Badge bg="green.500" />
                            <Text fontSize="2xl" fontWeight="bold" color="#fff">
                                {user.fullName ? user.fullName[0] : ''}
                            </Text>
                        </Avatar>
                        <Text fontSize="lg" fontWeight="bold" color="#fff">
                            {user.role.name === UserRoles.DRIVER
                                ? 'Tài Xế'
                                : user.role.name === UserRoles.USER
                                ? 'Khách Hàng'
                                : ''}
                        </Text>
                    </View>
                    <Center>
                        <VStack marginTop={30}>
                            <FormControl
                                isRequired
                                isInvalid={'fullName' in errors}>
                                <FormControl.Label>Họ và tên</FormControl.Label>
                                <Controller
                                    defaultValue={user.fullName || ''}
                                    control={control}
                                    render={({
                                        field: {onChange, onBlur, value},
                                    }) => (
                                        <Input
                                            defaultValue={user.fullName || ''}
                                            onBlur={onBlur}
                                            placeholder="Nhập họ và tên"
                                            onChangeText={val => onChange(val)}
                                            value={value}
                                            my="2"
                                            w="90%"
                                            borderRadius="20"
                                            type="text"
                                        />
                                    )}
                                    name="fullName"
                                    rules={{
                                        required: 'Vui lòng nhập họ tên',
                                    }}
                                />
                                <FormControl.ErrorMessage>
                                    {errors?.fullName?.message}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={'dob' in errors}>
                                <FormControl.Label>Ngày sinh</FormControl.Label>
                                <Controller
                                    defaultValue={formatDate(
                                        user.dob,
                                    ).toString()}
                                    control={control}
                                    render={({
                                        field: {onChange, onBlur, value},
                                    }) => (
                                        <Input
                                            onBlur={onBlur}
                                            onFocus={() =>
                                                setDatePickerVisibility(true)
                                            }
                                            placeholder="nhập ngày sinh"
                                            defaultValue={
                                                user.dob
                                                    ? formatDate(user.dob)
                                                    : undefined
                                            }
                                            onChangeText={val => onChange(val)}
                                            value={formatDate(
                                                dob,
                                                'DD-MM-YYYY',
                                            )}
                                            my="2"
                                            w="90%"
                                            borderRadius="20"
                                            type="text"
                                        />
                                    )}
                                    name="dob"
                                    rules={{
                                        required: 'Vui lòng nhập ngày sinh',
                                    }}
                                />
                                <FormControl.ErrorMessage>
                                    {errors?.dob?.message}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <FormControl w="320">
                                <FormControl.Label>Giới tính</FormControl.Label>
                                <Controller
                                    control={control}
                                    defaultValue={`${user.dob}`}
                                    render={({field: {onChange, value}}) => (
                                        <Select
                                            borderRadius="20"
                                            w="full"
                                            defaultValue={
                                                user.gender
                                                    ? `${user.gender}`
                                                    : undefined
                                            }
                                            onValueChange={(
                                                itemValue: string,
                                            ) => {
                                                onChange(itemValue);
                                            }}
                                            selectedValue={`${value}`}
                                            placeholder="Chọn giới tính">
                                            <Select.Item
                                                w="100%"
                                                label="Nam"
                                                value={'true'}
                                            />
                                            <Select.Item
                                                label="Nữ"
                                                value={'false'}
                                            />
                                        </Select>
                                    )}
                                    name="gender"
                                    rules={{
                                        required: 'Vui lòng chọn giới tính',
                                    }}
                                />
                                <FormControl.ErrorMessage>
                                    {errors.gender?.message}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl
                                isRequired
                                isInvalid={'email' in errors}>
                                <FormControl.Label>Email</FormControl.Label>
                                <Controller
                                    control={control}
                                    defaultValue={user.email}
                                    render={({
                                        field: {onChange, onBlur, value},
                                    }) => (
                                        <Input
                                            defaultValue={user.email}
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
                                            isEmail(value) ||
                                            'Email Không Hợp Lệ',
                                    }}
                                />
                                <FormControl.ErrorMessage>
                                    {errors?.email?.message}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl
                                isRequired
                                isInvalid={'phone' in errors}>
                                <FormControl.Label>
                                    Số điện thoại
                                </FormControl.Label>
                                <Controller
                                    control={control}
                                    render={({
                                        field: {onChange, onBlur, value},
                                    }) => (
                                        <Input
                                            defaultValue={user.phone}
                                            onBlur={onBlur}
                                            keyboardType="numeric"
                                            placeholder="Nhập số điện thoại"
                                            onChangeText={val => onChange(val)}
                                            value={value}
                                            my="2"
                                            w="90%"
                                            borderRadius="20"
                                            type="text"
                                        />
                                    )}
                                    name="phone"
                                    rules={{
                                        required: 'Vui lòng nhập số điện thoại',
                                        validate: value =>
                                            isPhone(value) ||
                                            'Số điện thoại Không Hợp Lệ',
                                    }}
                                />
                                <FormControl.ErrorMessage>
                                    {errors.phone?.message}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <Center>
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
                                            OK
                                        </Text>
                                    )}
                                </Button>
                            </Center>
                        </VStack>
                    </Center>
                </ScrollView>
            )}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={vl => setDob(vl)}
                onCancel={() => setDatePickerVisibility(false)}
            />
        </>
    );
};
