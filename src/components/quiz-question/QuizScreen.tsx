import React, {useState, useEffect} from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { QuizQuestions } from './QuizQuestions';
import { supabase } from '../../../supabaseClient';
import { useToast, useQuizPlay, useAuth} from '../../contexts';
import {quizQuestionType, quizDataType, quizCategoryDetailsType} from './quizQuestionTypes';

import { useAchievementDetail } from '../../hook';

const QuizScreen = () => {

    const [quizQuestions, setQuizQuestions] = useState<quizQuestionType[]>([]);
    const [quizDetails, setQuizDetails] = useState<quizCategoryDetailsType>();
    const [questionCurrentIndex, setQuestionCurrentIndex] = useState(0);
    const [markedAnswers, setMarkedAnswers] = useState<Array<number|null|undefined>>(new Array(quizQuestions.length));
    
    let quizScoreResult =0;
    let correctAnswers = 0;
    let percentage =0;
    let isQuizPassed : boolean;

   const isQuenstionsEnd = (questionCurrentIndex === quizQuestions.length);
  
    const {playquizid} = useParams();
    const {notifyError} = useToast();
    const navigate =  useNavigate();
    const { userDetails, getUserDetails, setUserDetails} = useAchievementDetail();
    //const {isQuizStarted, setIsQuizStarted} = useQuizPlay();
    const {currentUser} =  useAuth();


  const getQuizQuestions = async ()=>{
    
    try{
    const { data, error } : quizDataType = await supabase.from('category_details')
     .select('*, category!inner(*)')
     .eq('category.quizid', playquizid)
           
      if(data !== null){
        setQuizQuestions(data[0].quiz_option_answer)
        setQuizDetails(data[0].category)
      }
      if (error) throw error
    }catch(error){
      notifyError(error.message);
      console.error(error)
    }

}

    useEffect(()=>{
     
      getQuizQuestions()
    },[])

    useEffect(()=>{
      if(quizQuestions.length > 0){

        if(isQuenstionsEnd){
        
         quizScoreResult = quizQuestions.reduce((acc, curr,index) => {
        if(curr.answerIndex === markedAnswers[index]){
          correctAnswers ++;
            acc = acc+ curr.points;
        }
        return acc;
       }, 0)

       
        if(quizScoreResult * (100/ quizDetails?.quiz_points!) > 50){
          isQuizPassed=true;
          updateUserAchievements()

        }else{
          isQuizPassed = false;
        }

       addQuizHistory(quizScoreResult);
       navigate('/result', {state:{quizes:quizQuestions, useranswers: markedAnswers, quizdetail: quizDetails, isPassed:isQuizPassed, score: quizScoreResult}})
    }
   }
    },[isQuenstionsEnd])

    useEffect(()=>{
       getUserDetails();
    },[])



     const updateUserAchievements = async()=>{
       let quizPassedDbValue = (userDetails && userDetails[0]?.quiz_passed);
       let correctAnswerDbValue = (userDetails && userDetails[0]?.correct_answer);
       let currentStatsDbValue = (userDetails && userDetails[0]?.user_current_stat);
       let boosterLevelDbValue = (userDetails && userDetails[0]?.user_booster_level);

         // stored prev result of current stats value
       let cachedCurrentStatsDbValue = currentStatsDbValue;
     
       try{
        const { data, error } = await supabase
         .from('achievements')
         .update({ quiz_passed: (quizPassedDbValue)! +1 ,  
          correct_answer: (correctAnswerDbValue)! + correctAnswers,
          user_current_stat: (currentStatsDbValue == 100)? (currentStatsDbValue = 0): ( (currentStatsDbValue)!+10),
          user_booster_level: (cachedCurrentStatsDbValue == 100)? ((boosterLevelDbValue)! +1): boosterLevelDbValue ,
        })
         .match({ id: currentUser?.user.id })

         if(error) throw error
       }catch(error){
          notifyError('Error updating user level');
          console.error(error.message);
       }

     }

    const addQuizHistory = async(userScore:number)=>{
      const timestamp = new Date().toLocaleString();

      try{
        const {data, error} = await supabase.from('user_quiz_history').insert([
          {quiz_name:quizDetails?.quiz_name, quiz_score:quizDetails?.quiz_points,
            quiz_attempted_date:timestamp,
            quiz_questions:quizQuestions,
            quiz_passed: isQuizPassed,
            userid:currentUser?.user.id, quiz_user_answers:markedAnswers, user_score:userScore}
         ], { returning: 'minimal' })
         
         if(error) throw error
         
      }catch(error){
        notifyError('Something went wrong while sending data to server')
        console.error(error)
      }
    }    
   
  return (
     <>
       {
        quizQuestions && (
              <QuizQuestions  
               Question={quizQuestions?.[questionCurrentIndex]}
               Totalquestions ={quizQuestions?.length}
               Currentquestion={questionCurrentIndex+1}
               SetAnswer = {(index:number|null|undefined)=>{
                 setMarkedAnswers((arr:Array<undefined|null|number>)=> {
                 let newArr= [...arr];
                     newArr[questionCurrentIndex] = index;
                     return newArr;
                 })
                 setQuestionCurrentIndex(questionCurrentIndex+1)
               }}
              />
          )
       }
     </>
  )
}

export {QuizScreen}