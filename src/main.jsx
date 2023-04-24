
/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main.jsx';
import Home from './Comoinents/Home/Home.jsx';
import Login from './Comoinents/Login/Login.jsx';
import Register from './Register/Register.jsx';
import RegisterRBS from './Comoinents/RegisterRBS/RegisterRBS.jsx';
import RegisterRB from './Comoinents/RegisterRB/RegisterRB';






const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:'/',
        element:<Home></Home>,
      },
      {
        path:'/login',
        element:<Login></Login>,
      },
      {
        path:'/register',
        element:<Register></Register>,
      },
      {
        path:'/register-rbs',
        element:<RegisterRBS></RegisterRBS>
      },
      {
        path:'/register-bs',
        element:<RegisterRB></RegisterRB>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
