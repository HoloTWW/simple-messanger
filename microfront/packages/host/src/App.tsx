import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// @ts-ignore
const MainApp = lazy(() => import('messanger/MessangerApp'));
// @ts-ignore 
const AuthApp = lazy(() => import('auth/AuthApp'));

const HostApp = () => {
  const [lg,setLg] = useState<boolean>(true);
  return (
      <div className="mt-5">
        <nav className="mb-4 d-flex justify-content-center">
          {/* <Link to="/main" className="btn btn-link me-2">Main App</Link> */}
          <Link to="/auth/sign-in" className="btn btn-link">Auth</Link>
        </nav>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/main" element={<MainApp />} />
              <Route path="/auth/*" element={<AuthApp />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Suspense>
      </div>
  );
};

const HomePage = () => (
  <div className='text-center'>
    <h2>Host App </h2>
  </div>
);

export default HostApp;