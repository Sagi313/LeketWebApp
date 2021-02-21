import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  async function googleLogIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
  }

  return (
    <div>
      <div>
        <h2>העמותה למען חיות הבר</h2>
        <h2>התחברות</h2>
        {error && <p variant="danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div id="email">
            <input type="email" placeholder="אימייל" ref={emailRef} required />
          </div>
          <div id="password">
            <input
              type="password"
              placeholder="סיסמא"
              ref={passwordRef}
              required
            />
          </div>
          <div>
            <Link to="/forgot-password">שכחתי סיסמא</Link>
          </div>
          <button className="login-button" disabled={loading} type="submit">
            כניסה
          </button>
        </form>
      </div>
      <div className="login-screen-text">
        עוד לא נרשמת? הרשם
        <Link to="/signup">
          {" "}
          <p id="here-word-box">כאן</p>{" "}
        </Link>
      </div>
      <div>
        <button id="goole-login-button" type="button" onClick={googleLogIn}>
          <img src="photos\Google-Button.png" alt="google login img" />
          <p id="google-login-text"> התחבר עם גוגל </p>
        </button>
      </div>
    </div>
  );
}
