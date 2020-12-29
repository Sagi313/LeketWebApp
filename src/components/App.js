import React from "react";
import Register from "./Register";
import "./App.css";
import { AuthProvider } from "../contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Register />
      </div>
    </AuthProvider>
  );
}

export default App;
