// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
     "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
     apiKey: "AIzaSyASMGEunW6_OuJu3berPKLAHFK90gBUGSA",
     authDomain: "datn-44ee0.firebaseapp.com",
     projectId: "datn-44ee0",
     storageBucket: "datn-44ee0.appspot.com",
     messagingSenderId: "714857124227",
     appId: "1:714857124227:web:a0f3b47af4d4ba9d5fa6b6",
     measurementId: "G-JGNP3MRDT4",
};
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.
messaging.onBackgroundMessage((payload) => {
     console.log(
          "[firebase-messaging-sw.js] Received background message ",
          payload
     );
     // Customize notification here
     const notificationTitle = payload.notification.title;
     const notificationOptions = {
          body: payload.notification.body,
     };

     self.registration.showNotification(notificationTitle, notificationOptions);
});
