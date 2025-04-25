import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Menu from './pages/Menu/Menu';
import ChatList from './pages/ChatList/ChatList';
import Chat from './pages/Chat/ChatContainer';
import { store } from './store';
import { Provider } from 'react-redux';

const InApp = () => {
  const {interlocutor} = useParams<{interlocutor:string}>();
  console.log(interlocutor)
 
  return(
<div style={{height:'80vh'}} >
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

const MainApp: React.FC = () => {
  return (
    <div className="">
      <h1>Main Application (Port: 3002)</h1>
      <Provider store={store}>
        <InApp/>
      </Provider>
    </div>
  );
};

export default MainApp;