import React from 'react'
import { Toaster } from 'react-hot-toast';
import { Leaderboard } from '../../components';
import './leaderboard-page.css'
const LeaderboardPage = () => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <main className='container  pt-3'>
        <div className='flex flex-justify-center pb-2'>
          <h1>Leader-Board</h1>
        </div>
        <Leaderboard />
      </main>
    </>
  )
}

export { LeaderboardPage }