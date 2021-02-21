import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const fullNameRef = useRef();
  const movingAnimalsBoxRef = useRef();
  const phoneNumberRef = useRef();
  const birthDateRef = useRef();
  var user = firebase.auth().currentUser;

  function addtoDB() {
    // This adds the additional data of the user to the realtime DB in the firebase app
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
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    if (fullNameRef !== null) {
      //will be changed to the current fullname of the user
      user.updateProfile({
        displayName: fullNameRef,
      });
      console.log("Heo");
    }
    addtoDB(); //Updates the "meta" data of the user to Real-Time DB

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div>
        <h2>עדכן פרופיל</h2>
        {error && <p variant="danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div id="profile-img">
            <input type="file" />
          </div>
          <div id="full-name">
            <p>שם ושם משפחה</p>
            <input
              type="text"
              ref={fullNameRef}
              defaultValue={user.displayName}
            />
          </div>
          <div id="email">
            <p>אימייל</p>
            <input
              type="email"
              ref={emailRef}
              defaultValue={currentUser.email}
            />
          </div>
          <div id="phone-num">
            <p>טלפון</p>
            <input
              type="text"
              ref={phoneNumberRef}
              defaultValue={currentUser.phoneNumberRef}
            />
          </div>
          <div id="birth-date">
            <p>תאריך לידה</p>
            <input
              type="date"
              ref={birthDateRef}
              defaultValue={currentUser.birthDateRef}
            />
          </div>
          <div id="password">
            <p>סיסמא</p>
            <input
              type="password"
              ref={passwordRef}
              placeholder="השאר ריק כדי לא לשנות את הסיסמא"
            />
          </div>
          <div id="password-confirm">
            <p>אימות סיסמא</p>
            <input
              type="password"
              ref={passwordConfirmRef}
              placeholder="השאר ריק כדי לא לשנות את הסיסמא"
            />
          </div>
          <div>
            <p>אני מעוניין/ת להתנדב לשינוע חיות</p>
            <input type="checkbox" ref={movingAnimalsBoxRef}></input>
          </div>
          <button disabled={loading} type="submit">
            שמור
          </button>
        </form>
      </div>
      <div>
        <Link to="/">ביטול</Link>
      </div>
    </>
  );
}
