import React from 'react';
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="admin-panel-welcome-page">
      <h1>Welcome to the Admin Panel</h1>
      <p>Manage your content and settings here.</p>
      <div className="features">
        <div className="feature">
          <h2>Content Management</h2>
          <p>Easily create, edit, and delete content.</p>
        </div>
        <div className="feature">
          <h2>User Management</h2>
          <p>Manage user accounts and permissions.</p>
        </div>
        <div className="feature">
          <h2>Settings</h2>
          <p>Customize your admin panel settings.</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
