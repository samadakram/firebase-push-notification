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
                sendTokenToFirebase(currentToken);
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

const sendTokenToFirebase = (token) => {
    // Make an API call to Firebase to save the token
    // Example using fetch:
    fetch('https://fcm.googleapis.com/v1/projects/navigationapp-rn/messages:send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer AAAAibKeRBQ:APA91bF5SSR8R43jYopv6rDhLc0WcN5EylDhsK5aVdZR54s6mIbON03W7eCmoLslGFadD-O3CVStfa0Cv98RUKAyajJ3ryl9IkEjPCnm50K_X9ugNeGImBkuQ2jBs1Ek4wcc1gQjcgyc',
        },
        body: JSON.stringify(
            {
                "message": {
                    "token": token,
                    "notification": {
                        "title": "Background Message Title",
                        "body": "Background message body"
                    },
                }
            }
        ),
    })
        .then((response) => {
            console.log("res==", response.ok)
            if (response.ok) {
                console.log('Token sent to Firebase successfully.');
            } else {
                console.log('Failed to send token to Firebase.');
            }
        })
        .catch((error) => {
            console.log('An error occurred while sending token to Firebase.', error);
        });
};

