import React from 'react';
import { Link } from 'react-router-dom';

const AuthApp: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1>Auth Application (Port: 3002)</h1>
      <div className="mt-3">
        <Link to="/main" className="btn btn-link">Go to Main</Link>
        <Link to="/" className="btn btn-link">Go to Host</Link>
      </div>
    </div>
  );
};

export default AuthApp;