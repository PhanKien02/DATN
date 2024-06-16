import messaging from '@react-native-firebase/messaging';
import storage from '@react-native-firebase/storage';
export default class Firebase {
    static getTokenFirebase = async () => {
        try {
            // await messaging().registerDeviceForRemoteMessages()
            const fcmToken = await messaging().getToken();
            return fcmToken;
        } catch (error) {
            return error;
        }
    };

    static onCheckPermission = async () => {
        try {
            const authStatus = await messaging().requestPermission({
                alert: true,
                announcement: false,
                badge: true,
                carPlay: false,
                provisional: false,
                sound: true,
            });
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;
            if (!enabled) {
                Firebase.onRequestPermission();
            }
        } catch (e) {
            console.log('check permission error', e);
        }
    };

    static onRequestPermission = () => {
        try {
            messaging()
                .requestPermission({
                    alert: true,
                    announcement: false,
                    badge: true,
                    carPlay: false,
                    provisional: false,
                    sound: true,
                })
                .then(() => {
                    console.log('requestPermission success');
                })
                .catch(error => {
                    // User has rejected permissions
                    console.log('user rejected permission', error);
                });
        } catch (e) {
            console.log('request permission error', e);
        }
    };

    static onNotificationOpenedApp = callBack => {
        messaging().onNotificationOpenedApp(remoteMessage => {
            if (remoteMessage) {
                callBack(remoteMessage);
            }
        });
    };

    static getInitialNotification = callBack => {
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    callBack(remoteMessage);
                }
            });
    };

    static onMessage = callback =>
        messaging().onMessage(async remoteMessage => {
            callback(remoteMessage);
        });

    static uploadFiles = async (imagePath: string[]) => {
        console.log({upload: imagePath});

        const uploads = [];
        const promises = [];

        imagePath.forEach(file => {
            const reference = storage().ref(
                'bookings/' + file.split('/').pop(),
            ); // 2
            const task = reference
                .putFile(file)
                .then(() => {
                    // 4
                    const url = storage()
                        .ref('bookings/' + file.split('/').pop())
                        .getDownloadURL();
                    uploads.push(url);
                })
                .catch(e => console.log('uploading image error => ', e)); // 3
            promises.push(task);
        });

        const ul = await Promise.all(promises); // Wait for all promises to
        console.log({uploads, ul});
        return uploads;
    };
}
