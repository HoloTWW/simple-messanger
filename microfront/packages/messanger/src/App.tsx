import React from 'react';
import { Link } from 'react-router-dom';

const MainApp: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1>Main Application (Port: 3002)</h1>
      <div className="mt-3">
        <Link to="/auth" className="btn btn-link">Go to Main</Link>
        <Link to="/" className="btn btn-link">Go to Host</Link>
      </div>
    </div>
  );
};

export default MainApp;