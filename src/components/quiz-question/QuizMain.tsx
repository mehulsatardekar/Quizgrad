import React,{useState} from 'react'

import {Navigate } from "react-router-dom";

import { QuizScreen } from './QuizScreen';
import { useQuizPlay } from '../../contexts';

const QuizMain = () => {
    
  const {isQuizStarted} = useQuizPlay();
  
  return (
    <section className="mt-2  pb-3">
    {
      (isQuizStarted)?(
          <QuizScreen/>
        ):(
         <Navigate  to="/result"/>
        )
      }
    </section>
  )
}

export {QuizMain}