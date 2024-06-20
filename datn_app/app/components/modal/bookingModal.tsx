import {
    Button,
    Center,
    Flex,
    FormControl,
    Modal,
    Select,
    Text,
    View,
} from 'native-base';
import {useEffect, useMemo, useState} from 'react';
import {
    useBookingMutation,
    useGetPriceQuery,
    useGetPromotionQuery,
} from '../../services/api';
import {IPromotion} from '../../interface/promotion';
import {FindDriverModal} from './findDriverModal';
import {IPrice} from '../../interface/price';
import {BookingPayLoad} from '../../interface/booking';
import {Loading} from '../Loading';
import {useAppDispatch} from '../../models/root-store/root-store';
import {BOOKING} from '../../models/booking-slice';
import {save} from '../../utils/storage';
import {KeyAsyncStorage} from '../../constants/asyncStorage';
interface Props {
    customerId: number;
    originAddress: string;
    destinationAddress: string;
    originlongitude: number;
    destinationLongitude: number;
    originLatitude: number;
    destinationLatitude: number;
    distance: number;
    setShowModalFindDriver: any;
    setBkId: any;
}
export const BookingModal = ({
    originAddress,
    destinationAddress,
    distance,
    originLatitude,
    originlongitude,
    destinationLatitude,
    destinationLongitude,
    customerId,
    setShowModalFindDriver,
    setBkId,
}: Props) => {
    const dispath = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
    const [booking, {error, isLoading}] = useBookingMutation();

    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('Tiền Mặt');
    const [promotionId, setPromotionId] = useState<number | undefined>();
    const [errMes, setErrorMes] = useState('');
    const {data: dataPromotion, refetch: refetchPromotion} =
        useGetPromotionQuery({km: distance / 1000});
    const {data: dataPrice, refetch: refectPrice} = useGetPriceQuery({});
    const promotions = useMemo(() => {
        if (Array.isArray(dataPromotion))
            return dataPromotion.map((prm: IPromotion) => {
                return {
                    label: prm.programName,
                    value: prm.percent,
                    id: prm.id,
                };
            });
        else return [];
    }, [dataPromotion]);
    const prince: IPrice = dataPrice;
    useEffect(() => {
        showModal && refetchPromotion();
    }, [distance, showModal]);
    useEffect(() => {
        showModal && refectPrice();
    }, [showModal]);
    useEffect(() => {
        if (prince && prince.presentPrice)
            showModal && setTotal((distance / 1000) * prince.presentPrice);
        else setTotal(0);
    }, [dataPrice, showModal]);
    useEffect(() => {
        discount <= 0
            ? setTotalPayment(total)
            : setTotalPayment(total - (total * discount) / 100);
    }, [discount, total, showModal]);
    const handleBooking = () => {
        const payload: BookingPayLoad = {
            customerId: customerId,
            originAddress: originAddress,
            destinationAddress: destinationAddress,
            totalPayment: totalPayment,
            longDistance: distance / 1000,
            paymentMethod: paymentMethod,
            promotionId: promotionId,
            unitPriceId: prince.id,
            originLatitude: originLatitude,
            originlongitude: originlongitude,
            destinationLatitude: destinationLatitude,
            destinationLongitude: destinationLongitude,
        };
        booking({payload})
            .unwrap()
            .then(data => {
                if (!error) {
                    setShowModalFindDriver(true);
                    setBkId(data.id);
                    setShowModal(false);
                } else {
                    setErrorMes(
                        error['data'].message ||
                            'Có Lỗi Hệ Thống Vui Lòng Thử Lại',
                    );
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        if (promotions.length > 0) {
            const promotion = promotions.find(pr => pr.id === promotionId);
            promotion && promotion.value && setDiscount(promotion.value);
        }
    }, [promotionId]);

    return (
        <>
            <Center>
                <Button
                    onPress={() => setShowModal(true)}
                    borderRadius={20}
                    w="40"
                    mb={2}
                    opacity={0.8}
                    backgroundColor="#FBC632">
                    <Text fontWeight="bold" color="#fff">
                        Bắt Đầu
                    </Text>
                </Button>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content w="95%">
                        <Modal.CloseButton />
                        <Modal.Header>Đơn Hàng</Modal.Header>
                        <Modal.Body>
                            <View>
                                <View
                                    style={{
                                        display: 'flex',
                                    }}>
                                    <Text fontWeight="bold">Điểm Đón:</Text>
                                    <Text ml={5}>{originAddress}</Text>
                                </View>
                                <View justifyContent="start">
                                    <Text fontWeight="bold">Điểm Đến:</Text>
                                    <Text ml={5}>{destinationAddress}</Text>
                                </View>
                            </View>
                            <View>
                                <FormControl>
                                    <FormControl.Label>
                                        Mã Giảm Giá
                                    </FormControl.Label>
                                    <Select
                                        onValueChange={vl =>
                                            setPromotionId(+vl)
                                        }
                                        defaultValue={discount.toString()}>
                                        <Select.Item
                                            label={'Không Dùng Phiếu Giảm Giá'}
                                            value={undefined}
                                        />
                                        {promotions.map(promotion => {
                                            return (
                                                <Select.Item
                                                    key={promotion.id}
                                                    label={promotion.label}
                                                    value={promotion.id.toString()}
                                                />
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                {/* <FormControl>
                                    <FormControl.Label>
                                        Phương Thức Thanh Toán
                                    </FormControl.Label>
                                    <Select
                                        onValueChange={setPaymentMethod}
                                        defaultValue={paymentMethod}>
                                        <Select.Item
                                            label="Tiền Mặt"
                                            value="Tiền Mặt"
                                        />
                                        <Select.Item
                                            label="Chuyển Khoản"
                                            value="Chuyển Khoản"
                                        />
                                    </Select>
                                </FormControl> */}
                            </View>
                            <View mt={3}>
                                <Text fontWeight="bold" color="#F43">
                                    Tóm Tắt Đơn Hàng:
                                </Text>
                                <Flex
                                    ml={2}
                                    style={{
                                        gap: 5,
                                    }}
                                    justify="space-between"
                                    w="90%"
                                    direction="row">
                                    <Text fontWeight="bold">Tổng Tiền : </Text>
                                    <Text>
                                        {total.toLocaleString('vi-VN', {
                                            currency: 'VND',
                                        })}{' '}
                                        VNĐ
                                    </Text>
                                </Flex>
                                <Flex
                                    ml={2}
                                    style={{
                                        gap: 5,
                                    }}
                                    justify="space-between"
                                    w="90%"
                                    direction="row">
                                    <Text fontWeight="bold">Giảm Giá : </Text>
                                    <Text>{discount} %</Text>
                                </Flex>
                                <Flex
                                    ml={2}
                                    style={{
                                        gap: 5,
                                    }}
                                    justify="space-between"
                                    w="90%"
                                    direction="row">
                                    <Text fontWeight="bold">Tổng Thu : </Text>
                                    <Text>
                                        {totalPayment.toLocaleString('vi-VN', {
                                            currency: 'VND',
                                        })}
                                        VNĐ
                                    </Text>
                                </Flex>
                                {/* <Flex
                                    ml={2}
                                    style={{
                                        gap: 5,
                                    }}
                                    justify="space-between"
                                    w="90%"
                                    direction="row">
                                    <Text fontWeight="bold">
                                        Phương Thức Thanh Toán :
                                    </Text>
                                    <Text>{paymentMethod}</Text>
                                </Flex> */}
                            </View>
                            {errMes && (
                                <Text color={'#f43'} textAlign="center" mt={1}>
                                    {errMes}
                                </Text>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button
                                    variant="ghost"
                                    colorScheme="blueGray"
                                    onPress={() => {
                                        setShowModal(false);
                                    }}>
                                    Cancel
                                </Button>
                                <Button
                                    borderRadius={20}
                                    backgroundColor="#FBC632"
                                    onPress={handleBooking}>
                                    {isLoading ? (
                                        <Loading />
                                    ) : (
                                        'Tìm Kiếm Tài Xế'
                                    )}
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>
        </>
    );
};
