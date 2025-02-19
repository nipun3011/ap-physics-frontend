import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import './index.css';
import Homepage from './pages/homepage'
import Chatbot from './pages/chatbots'
import Chat from './pages/chat-page'
import Summary from './pages/summary'
import Questionnare from './pages/questionnare'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    children: [
      {
        path: '/chats',
        element: <Chatbot/>,
        children: [
          {
            path: '/chats/:chatId',
            element: <Chat/>,
          }
        ],
      },
      {
        path: '/questionnaire',
        element: <Questionnare/>,
      },
      {
        path: '/summary',
        element: <Summary/>,
      },
    ],
  },
  
]);

function App() {
  return (
    <div className='app'>
      <h1 className="title">AP Physics</h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
