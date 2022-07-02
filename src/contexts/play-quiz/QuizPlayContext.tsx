import React, {createContext, useContext, useState} from 'react'
import {quizPlayProviderContextProps, QuizPlayType} from './quizPlayTypes';



const QuizContext = createContext<QuizPlayType|null>(null);  



const QuizPlayData = ({children}: quizPlayProviderContextProps) => {
 const [isQuizStarted, setIsQuizStarted] = useState(false);

  return (
    <QuizContext.Provider value={{ isQuizStarted, setIsQuizStarted}}>
        {children}
    </QuizContext.Provider>
  )
}

const useQuizPlay = ()=> useContext (QuizContext) as QuizPlayType;

export {QuizPlayData, useQuizPlay};