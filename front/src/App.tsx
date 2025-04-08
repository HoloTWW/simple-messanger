import React from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './page/Menu/Menu';
import SignIn from './page/Auth/SignIn';
import SignUp from './page/Auth/SignUp';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import ContactList from './page/Menu/ModalComponent/ContactList';
import ChatList from './page/ChatList/ChatList';
import Chat from './page/Chat/Chat';
import { AuthProvider, useAuth } from './components/AuthContext';
import Etc from './page/404Page/404Page';


const InApp = () => {
  const {interlocutor} = useParams<{interlocutor:string}>();
  console.log(interlocutor) 
  return(
<div className='vh-100 '>
  <div className='row m-0 p-0 h-100'>
    <div style={{overflowY:"scroll", overflowX:"hidden"}} className='col-3 m-0 p-0 h-100'>
      <Menu/>
      <ChatList/>
    </div>
    <div className='col bg-secondary-subtle  h-100 overflow-hidden px-0 pt-2' >
      <Chat/>
    </div>
  </div>
</div>
)}

interface PrivateRouteProps {
  children: React.ReactNode; //  Исправлено на React.ReactNode
  //  Можно добавить другие props, если они нужны
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Загрузка...</div>; // Теперь всегда возвращаем ReactElement
  }

  return user ? <>{children}</> : <Navigate to="/sign-in" />; // Оборачиваем children в React.Fragment
};


function App() {
  return (
    <div className=''>
<AuthProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PrivateRoute><InApp/></PrivateRoute>}/>
      <Route path="/chat/:interlocutor" element={<PrivateRoute><InApp/></PrivateRoute>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="*" element={<Etc/>}/>
    </Routes>
  </BrowserRouter>
</AuthProvider>
    </div>
  );
}

export default App;

// <div className="App bg-secondary-subtle m-5 p-3">
        // {/* <Card/> */}
        // </div>