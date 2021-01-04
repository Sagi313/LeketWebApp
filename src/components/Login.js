import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

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

  return (
    <div>
      <div>
        <h2>Log In</h2>
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
          <button disabled={loading} type="submit">
            Log In
          </button>
        </form>
        <div>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
      <div>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
