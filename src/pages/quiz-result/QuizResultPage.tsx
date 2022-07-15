import React from 'react'
import { useLocation } from 'react-router-dom';
import { ResultAnswers } from '../../components'
import { userResultType } from '../../types'
import './quiz-result-page.css';

import { resultMessage } from '../../utils'
import { Toaster } from 'react-hot-toast';
const QuizResultPage = () => {
  const location = useLocation();
  const { useranswers, quizes, quizdetail, score, isPassed } = location.state as userResultType;

  const userPoint = score * (100 / quizdetail?.quiz_points!);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <main className='container'>
        <section className=" width-full mt-3 pt-1">
          <div className="flex flex-between flex-justify-center">
            <div className="flex flex-column gap mb-2 flex-justify-center flex-align-item-center">
              <span className="font-bold font-weight-800 font-sm label-text-primary mb-1">{quizdetail.quiz_name}</span>
              <span className="font-md-light font-bold qg-result-description mb-1">{resultMessage(userPoint)}</span>
              <span className=" font-bold flex-justify-center flex-align-item-center mb-1">You Scored:
                <span className="label-text-danger">{score}</span>/<span className="label-text-primary">{quizdetail.quiz_points}</span></span>
            </div>
          </div>
        </section>
        <section className="qg-result-container">
          <hr />
          <section className="flex flex-column flex-justify-center  mt-1 pt-1">
            <ResultAnswers />

          </section>
        </section>
      </main>
    </>
  )
}

export { QuizResultPage }