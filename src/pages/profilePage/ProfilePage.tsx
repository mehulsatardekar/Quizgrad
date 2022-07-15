import React from 'react'
import { Toaster } from 'react-hot-toast';
import { Profile } from '../../components';
import './profilepage.css';
const ProfilePage = () => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className='container'>
        <Profile />
      </div>
    </>
  )
}

export { ProfilePage }