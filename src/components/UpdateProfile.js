import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
          <div id="email">
            <p>אימייל</p>
            <input
              type="email"
              ref={emailRef}
              required
              defaultValue={currentUser.email}
            />
          </div>
          <div id="password">
            <p>סיסמא</p>
            <input
              type="password"
              ref={passwordRef}
              placeholder="Leave blank to keep the same"
            />
          </div>
          <div id="password-confirm">
            <p>אימות סיסמא</p>
            <input
              type="password"
              ref={passwordConfirmRef}
              placeholder="Leave blank to keep the same"
            />
          </div>
          <button disabled={loading} type="submit">
            עדכן
          </button>
        </form>
      </div>
      <div>
        <Link to="/">ביטול</Link>
      </div>
    </>
  );
}
