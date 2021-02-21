import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDxLX4pZ4Fo_fxGzTqrC4XH0JQX8DkX3yg",
  authDomain: "wild-life-575ad.firebaseapp.com",
  projectId: "wild-life-575ad",
  storageBucket: "wild-life-575ad.appspot.com",
  messagingSenderId: "779057052011",
  appId: "1:779057052011:web:cd78c4320231428adb342e",
  databaseURL:
    "https://wild-life-575ad-default-rtdb.europe-west1.firebasedatabase.app/",
});

export const auth = app.auth();
export default app;
