import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import './index.css';
import Homepage from './pages/homepage'
import Chatbot from './pages/chatbots'
import Chat from './pages/chat-page'
import Summary from './pages/summary'
import Questionnare from './pages/questionnare'
import Solver from './pages/question-solving'
import Navbar from './components/Navbar';
import Login from './pages/login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/register';


const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/',
    element: <ProtectedRoute><Homepage/></ProtectedRoute>,
    children: [
      {
        path: '/chats',
        element: <Chatbot />,
        children: [
          {
            path: '/chats/:chatId',
            element: <Chat />,
          }
        ],
      },
      {
        path: '/questionnaire',
        element: <Questionnare />,
      },
      {
        path: '/summary',
        element: <Summary />,
      },
      {
        path: '/qs/:quesID',
        element: <Solver />
      }
    ],
  },

]);

function App() {
  return (
    <AuthProvider>
      <div className='app'>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
