import React from 'react'
import { Routes, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import { createBrowserRouter } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext'
import { Navigate } from 'react-router-dom'
function App() {
  const { authUser } = useAuthContext();
  const router = createBrowserRouter([
    {
      path: '/',
      element: authUser ? <Home /> : <Navigate to='/login' />
    },
    {
      path: '/login',
      element: authUser ? <Navigate to='/' /> : <Login />
    },
    {
      path: '/signup',
      element: authUser ? <Navigate to='/' /> : <Signup />
    }
  ])
  const context = useAuthContext();
  console.log("Auth Context: ", context);
  return (

    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  )
}


export default App
