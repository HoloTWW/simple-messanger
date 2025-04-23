import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainApp = lazy(() => import('messanger/MessangerApp'));
const AuthApp = lazy(() => import('auth/AuthApp'));

const HostApp = () => {
  return (
    <div className="container mt-5">
      <h1>Host Application</h1>
      <nav className="mb-4">
        <Link to="/" className="btn btn-link me-2">Home</Link>
        <Link to="/main" className="btn btn-link me-2">Main App</Link>
        <Link to="/auth" className="btn btn-link">Auth App</Link>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/main" element={<MainApp />} />
          <Route path="/auth" element={<AuthApp />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const HomePage = () => (
  <div>
    <h2>Welcome to Host App</h2>
    <p>Select an app from the navigation above.</p>
  </div>
);

export default HostApp;