import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 1 - configurando router
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";

import Login from './routes/Login.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Register from './routes/Register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement : <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
