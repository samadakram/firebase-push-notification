importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyB6STRR_poJ5_Ofrjs-fvpI5CjfJVT4nfg",
    authDomain: "navigationapp-rn.firebaseapp.com",
    projectId: "navigationapp-rn",
    storageBucket: "navigationapp-rn.appspot.com",
    messagingSenderId: "591407236116",
    appId: "1:591407236116:web:21b496384000e0446d9301",
    measurementId: "G-ZVCGS8YECP"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});