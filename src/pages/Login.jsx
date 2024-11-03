import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://lamansysfaketaskmanagerapi.onrender.com/api/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();

      //Solo para ver qué se guarda al loguear
      console.log("Login response data:", data);
  
      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", data.user.email);

        onLogin(data.token);
    
      } else {
          alert("Login failed: " + data.message);
      }
  } catch (error) {
      console.error("Error:", error);
      alert("Error while trying to log in");
  }
};

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
