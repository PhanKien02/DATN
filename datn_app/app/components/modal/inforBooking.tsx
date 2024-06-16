import {Button, Modal, Text, View} from 'native-base';

import {Loading} from '../Loading';
import {useGetBookingByIdQuery} from '../../services/api';
import Toast from 'react-native-toast-message';
import {useEffect, useState} from 'react';
import {IBooking} from '../../interface/booking';
import {CameraComponent} from '../cameraComponent';
import Firebase from '../../utils/firebase';

interface Props {
    bookingId?: number;
    driverId?: number;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InforBookingModal = ({
    bookingId,
    driverId,
    open,
    setOpen,
}: Props) => {
    //camera

    const [booking, setBooking] = useState<IBooking | null>(null);
    const {data, refetch, isLoading} = useGetBookingByIdQuery({bookingId});
    const [photoPath, setPhotoPath] = useState<{uri: string}[]>([]);
    useEffect(() => {
        refetch();
    }, [bookingId]);
    useEffect(() => {
        setBooking(data);
    }, [data]);

    const hanleStartMoving = async () => {
        if (photoPath.length < 5)
            Toast.show({
                type: 'error',
                text1: 'Vui Lòng Chụp Lại Xe Ít Nhất 5 Tấm Hình Trước Khi Di Chuyển',
            });
        else {
            console.log('start');
            const imagePath = photoPath.map(path => path.uri);
            const url = await Firebase.uploadFiles(imagePath);
            console.log({url});
        }
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
                                            gap: 3,
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
                                    <CameraComponent
                                        photoPath={photoPath}
                                        setPhotoPath={setPhotoPath}
                                    />
                                </View>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                w="full"
                                borderRadius={10}
                                colorScheme="green"
                                onPress={hanleStartMoving}>
                                <Text fontWeight="bold" color={'#fff'}>
                                    Bắt Đầu Di Chuyển
                                </Text>
                            </Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </>
        </>
    );
};
