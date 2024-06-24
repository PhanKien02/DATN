import {Button, Center, Modal, Text, View} from 'native-base';

import {Loading} from '../Loading';
import {
    useCompleteMovingMutation,
    useGetBookingByIdQuery,
    useRateBookingMutation,
    useStartMoingMutation,
} from '../../services/api';
import Toast from 'react-native-toast-message';
import {useEffect, useState} from 'react';
import {IBooking} from '../../interface/booking';
import {CameraComponent} from '../cameraComponent';
import Firebase from '../../utils/firebase';
import {BookingStatus} from '../../constants/booking';
import {useAppDispatch} from '../../models/root-store/root-store';
import {BOOKING} from '../../models/booking-slice';
import {AirbnbRating} from 'react-native-ratings';
interface Props {
    bookingId: number;
    idDriver?: number;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isUser?: boolean;
}

export const InforBookingModal = ({
    bookingId,
    open,
    setOpen,
    idDriver,
    isUser = false,
}: Props) => {
    const dispath = useAppDispatch();
    const [booking, setBooking] = useState<IBooking | null>(null);
    const [startMoving, {isLoading: isLoadingStart}] = useStartMoingMutation();
    const [completeBooking, {isLoading: isLoadingComplete}] =
        useCompleteMovingMutation();
    const {data, refetch, isLoading} = useGetBookingByIdQuery({bookingId});
    const [ratingBooking] = useRateBookingMutation();
    const [photoPath, setPhotoPath] = useState<{uri: string}[]>([]);
    const [rating, setRating] = useState(0);
    const [errMessase, setErrMessage] = useState('');
    useEffect(() => {
        refetch();
    }, [bookingId]);
    useEffect(() => {
        setBooking(data);
    }, [data]);

    const DriverAction = async () => {
        if (photoPath.length < 5)
            Toast.show({
                type: 'error',
                text1: 'Vui Lòng Chụp Lại Xe Ít Nhất 5 Tấm Hình Trước Khi Di Chuyển',
            });
        else {
            if (booking.statused == BookingStatus.DRIVER_ACCEPTED) {
                const imagePath = photoPath.map(path => path.uri);
                const urls = (await Firebase.uploadFiles(imagePath, 'bookings'))
                    .map(url => url._j)
                    .filter(url => url != null);
                startMoving({bookingId, images: urls}).then(() => {
                    setOpen(false);
                    refetch();
                });
            }
            if (booking.statused === BookingStatus.MOVING) {
                completeBooking({bookingId, idDriver});
                dispath(BOOKING(null));
            }
        }
    };
    const CustomerAction = () => {
        ratingBooking({bookingId, rate: rating})
            .unwrap()
            .then(() => {
                setOpen(false);
                dispath(BOOKING(null));
                Toast.show({
                    type: 'success',
                    text1: 'Hoàn Thành Chuyến Đi',
                });
            })
            .catch(err => {
                console.log({err});
                setErrMessage(err.data.message);
            });
    };

    return (
        <>
            <>
                <Modal
                    isOpen={open}
                    width={440}
                    h={'full'}
                    ml={-10}
                    onClose={() => setOpen(false)}>
                    <Modal.Content>
                        <Modal.Header>
                            <Text fontWeight="bold">Đơn Hàng</Text>
                        </Modal.Header>
                        <Modal.Body h="full">
                            {isLoading || !booking ? (
                                <Loading />
                            ) : (
                                <View>
                                    <View
                                        w="full"
                                        style={{
                                            gap: 5,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                        <Text fontWeight="bold">
                                            Khách Hàng:
                                        </Text>
                                        <Text>{booking.customer.fullName}</Text>
                                    </View>
                                    <View
                                        w="full"
                                        style={{
                                            gap: 3,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                        <Text fontWeight="bold">
                                            Số Điện Thoại:
                                        </Text>
                                        <Text>{booking.customer.phone}</Text>
                                    </View>
                                    {isUser && (
                                        <View
                                            w="full"
                                            style={{
                                                gap: 3,
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                            }}>
                                            <Text fontWeight="bold">
                                                Tài Xế
                                            </Text>
                                            <Text>
                                                {booking.driver &&
                                                    booking.driver.fullName}
                                            </Text>
                                        </View>
                                    )}
                                    <View
                                        w="full"
                                        style={{
                                            gap: 3,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            flexWrap: 'wrap',
                                        }}>
                                        <Text fontWeight="bold">Điểm Đón:</Text>
                                        <Text>{booking.originAddress}</Text>
                                    </View>
                                    <View
                                        w="full"
                                        style={{
                                            gap: 3,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            flexWrap: 'wrap',
                                        }}>
                                        <Text fontWeight="bold">Điểm Đến:</Text>
                                        <Text>
                                            {booking.destinationAddress}
                                        </Text>
                                    </View>
                                    <View
                                        w="full"
                                        style={{
                                            gap: 3,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            flexWrap: 'wrap',
                                        }}>
                                        <Text fontWeight="bold">
                                            Quãng Đường:
                                        </Text>
                                        <Text>{booking.longDistance} Km</Text>
                                    </View>
                                    <View
                                        w="full"
                                        style={{
                                            gap: 3,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            flexWrap: 'wrap',
                                        }}>
                                        <Text fontWeight="bold">
                                            Tổng Tiền Thanh Toán:
                                        </Text>
                                        <Text>
                                            {booking.totalPayment.toLocaleString(
                                                'vi-VN',
                                                {
                                                    currency: 'VND',
                                                },
                                            )}
                                            VNĐ
                                        </Text>
                                    </View>
                                    {!isUser ? (
                                        <CameraComponent
                                            photoPath={photoPath}
                                            setPhotoPath={setPhotoPath}
                                        />
                                    ) : (
                                        <View>
                                            <AirbnbRating
                                                count={5}
                                                ratingContainerStyle={{
                                                    padding: 5,
                                                }}
                                                onFinishRating={setRating}
                                                defaultRating={0}
                                                showRating={false}
                                                reviews={[
                                                    'Terrible',
                                                    'Bad',
                                                    'Meh',
                                                    'OK',
                                                    'Good',
                                                ]}
                                                size={45}
                                            />
                                        </View>
                                    )}
                                </View>
                            )}
                            {errMessase && (
                                <Center>
                                    <Text color={'#F43'}>{errMessase}</Text>
                                </Center>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            {!isUser ? (
                                <Button
                                    w="full"
                                    borderRadius={10}
                                    colorScheme="green"
                                    onPress={DriverAction}>
                                    {isLoadingStart || isLoadingComplete ? (
                                        <Loading />
                                    ) : (
                                        <Text fontWeight="bold" color={'#fff'}>
                                            {booking &&
                                            booking.statused !=
                                                BookingStatus.MOVING
                                                ? 'Bắt Đầu Di Chuyển'
                                                : 'Thanh Toán Và Hoàn Thành Chuyến Đi'}
                                        </Text>
                                    )}
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        w="full"
                                        borderRadius={10}
                                        colorScheme="green"
                                        onPress={CustomerAction}>
                                        <Text fontWeight="bold" color={'#fff'}>
                                            OK
                                        </Text>
                                    </Button>
                                </>
                            )}
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </>
        </>
    );
};
