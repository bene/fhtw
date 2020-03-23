import firebase from "firebase"
import "firebase/firestore"

const config = {
    apiKey: "AIzaSyChzBzH4ECODmTWnlTwcSg6QXePIWyPvEA",
    authDomain: "fhtw-62da8.firebaseapp.com",
    databaseURL: "https://fhtw-62da8.firebaseio.com",
    projectId: "fhtw-62da8",
    storageBucket: "fhtw-62da8.appspot.com",
    messagingSenderId: "738064337746",
    appId: "1:738064337746:web:01d93ab4e9015d0a2f088b"
};
firebase.initializeApp(config);

export const db = firebase.firestore();