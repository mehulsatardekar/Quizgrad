import React from 'react'
import { Leaderboard } from '../../components';
import './leaderboard-page.css'
const LeaderboardPage = () => {
  return (
    <main className='container  pt-3'>
     <div className='flex flex-justify-center pb-2'>
        <h1>Leader-Board</h1>
     </div>
     <Leaderboard/>
    </main>
  )
}

export {LeaderboardPage}