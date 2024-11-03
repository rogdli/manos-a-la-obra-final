import React from 'react';
import useUsername from '../hooks/useUsername';
import '../styles/styles.css';

export function HomeContent() {
  const username = useUsername();

  return (
    <main className="home-content">
      <div>
        <h1 className="home-title">Home</h1>
        <p>Welcome to your Task Tracking App, {username}!</p>
      </div>
    </main>
  );
}