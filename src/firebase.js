import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBRAx93drF1lKxLic3PBsWJYsQt5WVTxp0",
  authDomain: "leket-israel.firebaseapp.com",
  projectId: "leket-israel",
  storageBucket: "leket-israel.appspot.com",
  messagingSenderId: "16655398559",
  appId: "1:16655398559:web:6d3a736da113d805ddd4aa",
});

export const auth = app.auth();
export default app;
