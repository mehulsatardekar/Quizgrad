import React from 'react'
import { Toaster } from 'react-hot-toast';

import { Login } from '../../components/index';

import './loginpage.css'
const LoginPage = () => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <Login />

    </>
  )
}

export { LoginPage }