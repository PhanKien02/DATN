// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
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
     appId: "1:714857124227:web:ef977615533e71bf5fa6b6",
     measurementId: "G-JFZLGDL5SF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
