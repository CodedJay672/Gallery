import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import {
  createBrowserRouter as Router,
  RouterProvider,
} from 'react-router-dom';
import Images from './Images/Images';

const router = Router([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Images />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
 );