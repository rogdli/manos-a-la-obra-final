import React from 'react';
import "../styles/styles.css";

const WelcomePage = ({ onStartLogin }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1 className="welcome-title">Welcome to the Task Tracking App</h1>
        <p className="welcome-description">
          Organize your projects, manage epics, track stories, and complete tasks efficiently with Task Tracking. Let's make productivity enjoyable!
        </p>
        <div className="welcome-buttons">
          <button onClick={onStartLogin} className="login-button">
            Log In
          </button>
          <button className="register-button">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
