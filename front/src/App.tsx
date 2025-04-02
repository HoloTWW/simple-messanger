import React from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './Menu/Menu';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactList from './Menu/ModalComponent/ContactList';
import ChatList from './ChatList/ChatList';
import Chat from './Chat/Chat';


function App() {
  return (
<BrowserRouter>
  <div className='vh-100 position-absolute'>
    <div className='row h-100'>
      <div style={{overflowY:"scroll", overflowX:"hidden"}} className='col-3 m-0 p-0 h-100'>
        <Menu/>
        <ChatList/>
      </div>
      <div className='col bg-secondary-subtle pt-2 position-relative h-100 overflow-hidden px-0' >
        <Chat/>
      </div>
    </div>
  </div>
  <Routes>
    <Route path="/auth/sign-in" element={<SignIn/>}/>
    <Route path="/auth/sign-up" element={<SignUp/>} />
  </Routes>
</BrowserRouter>
  );
}

export default App;

// <div className="App bg-secondary-subtle m-5 p-3">
        // {/* <Card/> */}
        // </div>