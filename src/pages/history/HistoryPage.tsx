import React from 'react'
import '../history/historypage.css'
import { History } from '../../components';
import { Toaster } from 'react-hot-toast';
const HistoryPage = () => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <main className='container  pt-3'>
        <History />
      </main>
    </>
  )
}

export { HistoryPage }