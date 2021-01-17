import firebase from '@firebase/app';
import "firebase/firestore";
require('firebase/auth');

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY ,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN ,
    projectId: process.env.REACT_APP_PROJECT_ID ,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET ,
    messagingSenderId: process.env.REACT_APP_MESSAING_ID ,
    appId: process.env.APP_APP_ID
}
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();