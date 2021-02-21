import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/database";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  var user = firebase.auth().currentUser;
  const profilePicture = "photos/profile pic.png";

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function handleDelete() {
    // Need to implament a reauthentication here. This func wont delete a user who is signed in for too long
    user.delete();
  }

  return (
    <div>
      <div>
        {error && <p variant="danger">{error}</p>}
        <img src={profilePicture} alt="your profile picture" />
        <h2>פרופיל</h2>
        <p>{user.displayName}</p>
        <p>{currentUser.email}</p>
        <p>050-1234567</p>
        <p>01/01/2020</p>
      </div>
      <div>
        <button variant="link" onClick={handleLogout}>
          התנתק
        </button>
      </div>
      <div>
        <Link to="/update-profile">
          <button className="empty-btn" type="button">
            עריכת פרופיל
          </button>
        </Link>
      </div>
      <div>
        <button className="empty-btn" type="button" onClick={handleDelete}>
          מחיקת פרופיל
        </button>
      </div>
      <div>
        <button className="volunteer-btn" type="button">
          דף קשר מתנדבים
        </button>
      </div>
    </div>
  );
}
