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
        <h2>Sign Up</h2>
        {error && <p variant="danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div id="email">
            <p>Email</p>
            <input type="email" ref={emailRef} required />
          </div>
          <div id="password">
            <p>Password</p>
            <input type="password" ref={passwordRef} required />
          </div>
          <div id="password-confirm">
            <p>Password Confirmation</p>
            <input type="password" ref={passwordConfirmRef} required />
          </div>
          <button disabled={loading} type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}
