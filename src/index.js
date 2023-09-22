import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import {
  createHashRouter as Router,
  RouterProvider,
} from 'react-router-dom';

const router = Router([
  {
    path: '/',
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
 );