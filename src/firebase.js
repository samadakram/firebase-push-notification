import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

export const Sendrequest = () => {
    console.log("Requesting User Permission......");
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification User Permission Granted.");
        } else {
            console.log("User Permission Denied.");
        }
    });
}

Sendrequest();

const firebaseConfig = {
    apiKey: "AIzaSyB6STRR_poJ5_Ofrjs-fvpI5CjfJVT4nfg",
    authDomain: "navigationapp-rn.firebaseapp.com",
    projectId: "navigationapp-rn",
    storageBucket: "navigationapp-rn.appspot.com",
    messagingSenderId: "591407236116",
    appId: "1:591407236116:web:21b496384000e0446d9301",
    measurementId: "G-ZVCGS8YECP"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: 'BKpau8N3eS_Lc9XHpVsBfiPGCgO7oS9n-rIZWm0RBde_Pjt1OpATsKwKx2VOJCtHglzopNKJJRvNYTL0cSQk98w' })
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);
                // Perform any other neccessary action with the token
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("payload", payload)
            resolve(payload);
        });
    });


