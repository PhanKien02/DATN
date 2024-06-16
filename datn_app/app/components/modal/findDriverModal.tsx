import {Button, Flex, Input, Modal, Radio, Text} from 'native-base';
import {Loading} from '../Loading';
import {useEffect, useState} from 'react';
import {cancelReason} from '../../constants/booking';
import {useCancelBookingMutation} from '../../services/api';
import {load} from '../../utils/storage';
import {KeyAsyncStorage} from '../../constants/asyncStorage';

interface Props {
    open: boolean;
    setOpen: (vl: boolean) => void;
    setShowBooking: (vl: boolean) => void;
    idBooking?: number;
}
export const FindDriverModal = ({open, setOpen, setShowBooking}: Props) => {
    const [cancel, setCancel] = useState(false);
    const [reason, setReason] = useState('');
    const [textReason, setTextReason] = useState('');
    const [cancelBooking, {isLoading}] = useCancelBookingMutation();
    const [errorMes, setErrorMes] = useState('');
    const [id, setId] = useState();
    useEffect(() => {
        open && load(KeyAsyncStorage.BOOKING).then(data => setId(data.id));
    }, [open]);

    return (
        <>
            <Modal isOpen={open}>
                <Modal.Content maxWidth="400px">
                    <Modal.Header />
                    <Modal.Body>
                        <Flex>
                            <Loading title="Đang Tìm Tài Xế" />
                        </Flex>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                borderRadius={10}
                                colorScheme="danger"
                                onPress={() => {
                                    setCancel(true), setOpen(false);
                                }}>
                                <Text fontWeight="bold" color={'#fff'}>
                                    Hủy Dịch Vụ
                                </Text>
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={cancel}>
                <Modal.Content w="95%">
                    <Modal.Header>
                        <Text fontWeight="bold" color="#F43">
                            Bạn Muốn Hủy Dịch Vụ?
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Radio.Group
                            name="cancelReason"
                            accessibilityLabel="Chọn Lý Do Hủy Chuyến"
                            onChange={vl => setReason(vl)}>
                            {cancelReason.map(reason => {
                                return (
                                    <Radio value={reason} my={1}>
                                        {reason}
                                    </Radio>
                                );
                            })}
                            <Radio value={null} my={1}>
                                Khác
                            </Radio>
                        </Radio.Group>
                        {reason === null && (
                            <Input
                                type="text"
                                placeholder="Lý Do Hủy Dịch Vụ"
                                borderRadius={20}
                                mt={2}
                                onChangeText={setTextReason}
                            />
                        )}
                        {errorMes && (
                            <Text color={'#f43'} textAlign="center" mt={1}>
                                {errorMes}
                            </Text>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setCancel(false);
                                    setOpen(true);
                                }}>
                                Hủy Bỏ
                            </Button>
                            <Button
                                borderRadius={10}
                                colorScheme="danger"
                                onPress={() => {
                                    if (!reason && !textReason)
                                        setErrorMes('Vui Lòng Chọn Lý Do Hủy');
                                    else {
                                        cancelBooking({
                                            id,
                                            cancelReason: reason || textReason,
                                        }).then(() => {
                                            setOpen(false);
                                            setTextReason('');
                                            setReason(undefined);
                                            setCancel(false);
                                        });
                                    }
                                }}>
                                <Text fontWeight="bold" color={'#fff'}>
                                    {isLoading ? <Loading /> : ' Hủy Dịch Vụ'}
                                </Text>
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    );
};
