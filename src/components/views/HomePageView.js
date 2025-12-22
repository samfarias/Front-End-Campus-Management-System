/*==================================================
HomePageView.js
The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import React, { useEffect, useState } from "react";

const HomePageView = () => {
  const [fadeIn, setFadeIn] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  // Inline style objects
  const wrapperStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1350&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(46, 58, 89, 0.75)', // warm dark slate overlay
    padding: '3rem',
    borderRadius: '12px',
    color: 'white',
    textAlign: 'center',
    maxWidth: '700px',
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 1s ease, transform 1s ease',
  };

  const headingStyle = {
    fontSize: '2.7rem',
    marginBottom: '1rem',
  };

  const subtextStyle = {
    fontSize: '1.2rem',
    lineHeight: '1.5',
  };

  // Render Home page view
  return (
    <div style={wrapperStyle}>
      <div style={overlayStyle}>
        <h1 style={headingStyle}>Welcome to the Campus Management System</h1>
        <p style={subtextStyle}>
           Organize, and manage your Campuses. 🏫
        </p>
      </div>
    </div>
  );
}

export default HomePageView;