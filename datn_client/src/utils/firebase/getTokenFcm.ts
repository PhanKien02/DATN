import { getToken } from "firebase/messaging";
import { messaging } from "./firebaseConfigs";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.

export const getTokenFcm = async () => {
     const permission = await Notification.requestPermission();
     if (permission === "granted") {
          const token = await getToken(messaging, {
               vapidKey: import.meta.env.FE_WEBPUSHCERTIFICATES,
          });
          console.log({ token });
          return token;
     }
};
