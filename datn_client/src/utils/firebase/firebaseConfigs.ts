// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { MessagePayload, getMessaging, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: import.meta.env.FE_FIRSEBASE_KEY,
     authDomain: "datn-44ee0.firebaseapp.com",
     projectId: "datn-44ee0",
     storageBucket: "datn-44ee0.appspot.com",
     messagingSenderId: "714857124227",
     appId: "1:714857124227:web:a0f3b47af4d4ba9d5fa6b6",
     measurementId: "G-JGNP3MRDT4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const messaging = getMessaging(app);
export const onMessageListener = () =>
     new Promise((resolve) => {
          onMessage(messaging, (payload: MessagePayload) => {
               console.log("payload", payload);
               resolve(payload);
          });
     });
