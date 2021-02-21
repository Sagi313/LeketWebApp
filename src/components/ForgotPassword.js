import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }
  return (
    <div>
      <div>
        <h2>לקט ישראל</h2>
        <h2>שכחת סיסמא?</h2>
        {error && <p variant="danger">{error}</p>}
        {message && <p variant="success">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div id="email">
            <p>מלא/י את כתובת המייל שלך ונשלח לך את הסיסמא לשם</p>
            <input type="email" ref={emailRef} required />
          </div>
          <button disabled={loading} type="submit">
            שליחה
          </button>
        </form>
        <div>
          <Link to="/login">התחבר</Link>
        </div>
      </div>
      <div className="login-screen-text">
        עוד לא נרשמת? הרשם<Link to="/signup"> כאן </Link>
      </div>
    </div>
  );
}
