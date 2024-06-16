import {useIsFocused} from '@react-navigation/native';
import ImageView from 'react-native-image-viewing';
import {Button, Center, Image, Modal} from 'native-base';
import {useEffect, useRef, useState} from 'react';
import {
    Alert,
    PermissionsAndroid,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {openSettings} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import {
    Camera,
    getCameraDevice,
    useCameraFormat,
    useCameraPermission,
} from 'react-native-vision-camera';
import BackIcon from './icons/backIcon';

interface Props {
    photoPath: {uri: string}[];
    setPhotoPath: React.Dispatch<
        React.SetStateAction<
            {
                uri: string;
            }[]
        >
    >;
}
export const CameraComponent = ({photoPath, setPhotoPath}: Props) => {
    const camera = useRef(null);
    const [visible, setIsVisible] = useState(false);
    const [showCam, setShowCam] = useState(false);
    const isFocused = useIsFocused();
    const isActive = isFocused;
    const devices = Camera.getAvailableCameraDevices();
    const {hasPermission} = useCameraPermission();
    const device = getCameraDevice(devices, 'back', {
        physicalDevices: [
            'ultra-wide-angle-camera',
            'wide-angle-camera',
            'telephoto-camera',
        ],
    });
    useEffect(() => {
        if (!device || !hasPermission)
            Alert.alert(
                '',
                'Driver Service yêu cầu quyền truy cập máy ảnh của bạn',
                [{text: 'Cài đặt', onPress: openSettings}],
            );
    }, [device, hasPermission]);
    const format = useCameraFormat(device, [
        {photoResolution: {width: 1280, height: 720}},
    ]);
    useEffect(() => {
        const storagePermission = PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ).then();
        const readPermission = PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        console.log({storagePermission, readPermission});
    }, []);
    const savePhoto = async photoPath => {
        try {
            const destinationPath = `${
                RNFS.PicturesDirectoryPath
            }/photo_${Date.now()}.jpg`;
            await RNFS.copyFile(photoPath, destinationPath);
            setPhotoPath(photo =>
                photo.concat([{uri: 'file://' + destinationPath}]),
            );
        } catch (error) {
            console.error('Error saving photo:', error);
        }
    };
    const handleTakePhoto = async () => {
        try {
            const newPhoto = await camera.current.takePhoto({
                flash: 'auto',
                enableAutoStabilization: true,
                enableAutoRedEyeReduction: true,
                qualityPrioritization: 'quality',
            });
            savePhoto(newPhoto.path);
            // setPhotoPath(photo =>
            //     photo.concat([{uri: 'file://' + newPhoto.path}]),
            // );
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <Center mt={3}>
                <Button
                    onPress={() => {
                        photoPath.length > 0
                            ? setIsVisible(true)
                            : setShowCam(true);
                    }}
                    borderColor="black"
                    borderWidth={2}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    w="56"
                    background="gray.200">
                    <Image
                        source={
                            photoPath[0] || {
                                uri: 'https://firebasestorage.googleapis.com/v0/b/datn-44ee0.appspot.com/o/cameraIcon.png?alt=media&token=4410c95b-5c94-4ea4-9bdf-1b81416acb0b',
                            }
                        }
                        alt="Imgage"
                        size={photoPath.length > 0 ? '2xl' : 'md'}
                    />
                </Button>
                {photoPath.length > 0 && (
                    <Button
                        mt={2}
                        w={'56'}
                        colorScheme={'orange'}
                        onPress={() => {
                            setPhotoPath([]);
                            setShowCam(true);
                        }}>
                        Chụp Lại
                    </Button>
                )}
            </Center>
            <ImageView
                images={photoPath}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
            {showCam && (
                <Modal
                    isOpen={showCam}
                    w="sm"
                    style={{
                        position: 'absolute',
                    }}>
                    <Camera
                        ref={camera}
                        style={StyleSheet.absoluteFill}
                        collapsable
                        preview={true}
                        device={device}
                        isActive={isActive}
                        focusable={true}
                        photo={true}
                        enableDepthData={true}
                        enableZoomGesture={true}
                        format={format}
                    />
                    <TouchableOpacity
                        onPress={handleTakePhoto}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: '45%',
                            width: 50,
                            borderRadius: 100,
                            borderColor: '#fff',
                            borderWidth: 3,
                            height: 50,
                            backgroundColor: '#F43',
                            marginBottom: 15,
                        }}></TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setShowCam(false)}
                        style={{
                            position: 'absolute',
                            top: 30,
                            left: 0,
                            width: 50,
                            height: 50,
                            marginBottom: 15,
                        }}>
                        <BackIcon />
                    </TouchableOpacity>
                </Modal>
            )}
        </>
    );
};
