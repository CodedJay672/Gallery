import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { loader as rootLoader } from './App/App';
import ReqLogin from './Login/ReqLogin';
import Login from './Login/Login';
import ErrorPage from './Error/ErrorPage';
import {
  createHashRouter as Router,
  RouterProvider,
} from 'react-router-dom';

const router = Router([
  {
    path: '/',
    element:
    <ReqLogin>
      <App />
    </ReqLogin>,
    loader: rootLoader,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
 );
