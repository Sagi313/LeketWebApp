import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: process.env.fire_base_apiKey,
  authDomain: process.env.fire_base_authDomain,
  projectId: process.env.fire_base_projectId,
  storageBucket: process.env.fire_base_storageBucket,
  messagingSenderId: process.env.fire_base_messagingSenderId,
  appId: process.env.fire_base_appId,
});

export const auth = app.auth();
export default app;
