import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const Si = ()=><>Avboba</>;

const AuthApp: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1>Auth Application (Port: 3001) Check Queres</h1>
      <div className="mt-3">
        <Routes>
          <Route path="sign-in" element={<SignIn/>} />
          <Route path="sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
};

export default AuthApp;