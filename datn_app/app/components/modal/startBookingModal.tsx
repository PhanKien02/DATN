import {Button, Center, Flex, Modal, Text, View} from 'native-base';

import {Loading} from '../Loading';
import {
    useAcceptBookingMutation,
    useGetBookingByIdQuery,
} from '../../services/api';
import {useEffect, useState} from 'react';
import {IBooking} from '../../interface/booking';
import {useAppDispatch} from '../../models/root-store/root-store';
import {BOOKING} from '../../models/booking-slice';

interface Props {
    bookingId: number;
    driverId: number;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const StartBookingModal = ({
    bookingId,
    driverId,
    open,
    setOpen,
}: Props) => {
    const dispath = useAppDispatch();
    const [booking, setBooking] = useState<IBooking | null>(null);
    const {data, refetch, isLoading} = useGetBookingByIdQuery({bookingId});
    const [acceptBooking] = useAcceptBookingMutation();
    useEffect(() => {
        refetch();
    }, [bookingId]);
    useEffect(() => {
        setBooking(data);
    }, [data]);
    const hanleAcceptBooking = () => {
        acceptBooking({bookingId: booking.id, driverId}).then(() => {
            dispath(BOOKING(booking));
            setOpen(false);
        });
    };
    return (
        <>
            <Center>
                <Modal isOpen={open} width={440} ml={-10}>
                    <Modal.Content>
                        <Modal.Header>
                            <Text fontWeight="bold">Đơn Hàng</Text>
                        </Modal.Header>
                        <Modal.Body>
                            {isLoading || !booking ? (
                                <Loading />
                            ) : (
                                <>
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
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                disabled={isLoading ? true : false}
                                borderRadius={10}
                                colorScheme="green"
                                onPress={hanleAcceptBooking}>
                                <Text fontWeight="bold" color={'#fff'}>
                                    Nhận Đơn
                                </Text>
                            </Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>
        </>
    );
};
