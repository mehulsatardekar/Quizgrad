import React from 'react'
import { supabase } from '../../../supabaseClient';

import { useParams } from 'react-router-dom';

import { QuizDetail } from '../../components';
import './quizrule.css'
import { Toaster } from 'react-hot-toast';
const QuizrulePage = () => {

  const { quizid } = useParams();


  return (
    <>
          <Toaster position="bottom-center" reverseOrder={false} />

      <main className='container'>
        <QuizDetail quizid={quizid} />

        {/* quiz rule section */}
        <section className="flex flex-column gap-1">
          <div className="flex flex-column gap-1 mb-1">
            <span className="font-bold font-weight-800 font-sm">Quiz Rules</span>
          </div>
          <div className="flex mb-3">
            <ul className="qg-rules list-number">
              <li>This quiz consists of  multiple-choice questions.</li>
              <li>To be successful with the quizzes, it's important to be conversant with the topics.</li>
              <li>Each multiple choice question has only one correct answer.</li>
              <li> To win the quiz you need to score more than 70%.</li>
              <li>To start, click the  <span className="label-text label-text-primary">Start </span>
                button. When finished, click the <span className="label-text label-text-danger">Submit</span> button.</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}

export { QuizrulePage }