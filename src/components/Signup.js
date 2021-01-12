import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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

    setLoading(false);
  }

  return (
    <div>
      <div>
        <h2>העמותה למען חיות הבר</h2>
        <h2>הרשמה</h2>
        {error && <p variant="danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div id="email">
            <p className="Signup-info-text">שם ושם משפחה</p>
            <input type="text" />
          </div>
          <div id="email">
            <p className="Signup-info-text">אימייל</p>
            <input type="email" ref={emailRef} required />
          </div>
          <div id="phoneNum">
            <p className="Signup-info-text">טלפון</p>
            <input type="text" />
          </div>
          <div id="birthDate">
            <p className="Signup-info-text">תאריך לידה</p>
            <input type="text" />
          </div>
          <div id="password">
            <p className="Signup-info-text">סיסמא</p>
            <input type="password" ref={passwordRef} required />
          </div>
          <div id="password-confirm">
            <p className="Signup-info-text">אימות סיסמא</p>
            <input type="password" ref={passwordConfirmRef} required />
          </div>
          <button disabled={loading} type="submit">
            הרשמה
          </button>
        </form>
      </div>
      <div>
        יש לך חשבון? <Link to="/login">התחברות</Link>
      </div>
    </div>
  );
}
