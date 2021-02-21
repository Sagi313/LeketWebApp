import React, { useImperativeHandle, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const phoneNumberRef = useRef();
  const movingAnimalsBoxRef = useRef();
  const birthDateRef = useRef();
  const fullNameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImg] = useState("photos/profile pic.png");
  const history = useHistory();

  async function addtoDB(user) {
    // This adds the additional data of the user to the realtime DB in the firebase app
    if (user !== null) {
      //Need to resolve this. for some reason the user == null
      var token = user.uid;
      console.log(token);
      firebase
        .database()
        .ref("/user/" + token)
        .set({
          birthdate: birthDateRef.current.value,
          phone: phoneNumberRef.current.value,
          movinganimals: movingAnimalsBoxRef.current.value,
        });
    } else {
      console.log("Bug");
    }
  }

  function imageHandler(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ profileImg: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    var user = firebase.auth().currentUser;

    addtoDB(user);
    setLoading(false);
  }

  return (
    <div>
      <div className="container">
        <div className="img-holder">
          <img src={profileImg} />
        </div>
        <label className="custom-file-upload">
          <input
            className="change-profile-img"
            type="file"
            accept="image/*"
            name="image-upload"
            onChange={imageHandler}
          />
        </label>
      </div>

      <div>
        <h2>העמותה למען חיות הבר</h2>

        <h2>הרשמה</h2>
        {error && <p variant="danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="register-field">
            <input
              className="signup-input"
              type="text"
              ref={fullNameRef}
              required
            />
            <p className="Signup-info-text">שם ושם משפחה</p>
          </div>
          <div className="register-field">
            <input
              className="signup-input"
              type="email"
              ref={emailRef}
              required
            />
            <p className="Signup-info-text">אימייל</p>
          </div>
          <div className="register-field">
            <input
              className="signup-input"
              type="text"
              ref={phoneNumberRef}
              required
            />
            <p className="Signup-info-text">טלפון</p>
          </div>
          <div className="register-field">
            <input
              className="signup-input"
              type="date"
              ref={birthDateRef}
              required
            />
            <p className="Signup-info-text">תאריך לידה</p>
          </div>
          <div className="register-field">
            <input
              className="signup-input"
              type="password"
              ref={passwordRef}
              required
            />
            <p className="Signup-info-text">סיסמא</p>
          </div>
          <div className="register-field">
            <input
              className="signup-input"
              type="password"
              ref={passwordConfirmRef}
              required
            />
            <p className="Signup-info-text">אימות סיסמא</p>
          </div>
          <div>
            <input
              className="check-box"
              type="checkbox"
              ref={movingAnimalsBoxRef}
            ></input>
            <p className="check-box-text">אני מעוניין/ת להתנדב לשינוע חיות</p>
          </div>
          <div>
            <p className="check-box-text">תנאי ההסכמה </p>
            <p className="check-box-text"> בלחיצה על ההרשמה אני מאשר/ת את</p>
          </div>
          <button disabled={loading} type="submit">
            הרשמה
          </button>
        </form>
      </div>
      <div>
        יש לך חשבון? <Link to="/login">התחברות</Link>
      </div>
      <div className="test">
        <button onClick={addtoDB}>Add extra data- to be removed</button>
      </div>
    </div>
  );
}
