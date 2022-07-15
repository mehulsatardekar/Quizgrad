import React from 'react'
import { Toaster } from 'react-hot-toast'

import { Signup } from '../../components'
const SignupPage = () => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <Signup />
    </>
  )
}

export { SignupPage }