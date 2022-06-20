import React, {useEffect,useState} from 'react'
import { supabase } from '../../../supabaseClient';
import {quizCategoriesDetailsType, categoriesType, quizParamType} from '../../types';
import {convertDateToMonthAndYear} from '../../utils/'
import { useToast, useQuizPlay, useAuth } from "../../contexts";
import  { Toaster } from "react-hot-toast";
import { useNavigate, Link } from 'react-router-dom';


const QuizDetail = ({quizid}: quizParamType) => {

  const [quizDetail, setQuizDetail] = useState<quizCategoriesDetailsType|null>();
  
  const {notifyError} = useToast();
  const {currentUser} = useAuth();
  
  const {isQuizStarted,setIsQuizStarted} = useQuizPlay();
  const navigate =  useNavigate();

  
  useEffect(()=>{
    getSingleQuizData();
  },[])


  const getSingleQuizData = async()=>{
    
    try{
      
      const { data, error } = await supabase
      .from('category')
      .select('*').eq('quizid',quizid).single();
       
      if(error) throw error;
       setQuizDetail(data);
       
    }catch(error){
      console.error(error)
      notifyError('Something went wrong while fetching data')
    }
  
  }

  const startQuiz= ()=>{
    if(!currentUser){
     navigate('/login')
    }

    
    setIsQuizStarted(true)
    navigate(`/playquiz/${quizid}`);
  }
  return (
    <section className="flex flex-wrap flex-column mt-3 mb-3">
      <Toaster/>
        <div className="flex flex-between flex-align-item-center flex-wrap ">
            <div className="flex flex-column mb-3 ">
                <span className="font-bold font-weight-800 font-sm">{quizDetail?.quiz_name}</span>
                <span className="font-md-light">Read the following Instructions.</span>
              </div>
              <button className="btn-primary btn btn-py-1 flex flex-justify-center qg-start-btn"
               onClick={startQuiz}
              >
                <span className="icon-default-pl"> Start Quiz </span>
            </button> 
        </div>

        <div className="flex flex-wrap gap ">
          
          <div className="flex relative">
              <img
               src={quizDetail?.quiz_image}
               alt={quizDetail?.quiz_name}
                loading="lazy"
                className="img-category"
                height={230}
                width={330}
              />
              <div className="img-text-right">
                <span>{quizDetail?.quiz_name}</span>
              </div>
            </div>
          <div className="flex-column flex gap-3 flex-justify-center">
            <div className="flex gap flex-align-item-center">
              <span className="qg-font-sm font-bold">Date:</span>
              <span className="font-md-light">{convertDateToMonthAndYear("en-US", quizDetail?.published_time)}</span>
            </div>

            <div className="flex gap flex-align-item-center">
              <span className="qg-font-sm font-bold">Time Limit:</span>
              <span className="font-md-light">{quizDetail?.quiz_duration} Minutes</span>
            </div>

            <div className="flex gap flex-align-item-center">
              <span className="qg-font-sm font-bold">Points:</span>
              <span className="font-md-light">{quizDetail?.quiz_points} Points</span>
            </div>

            <div className="flex gap flex-align-item-center">
                <span className="qg-font-sm font-bold">Questions:</span>
                <span className="font-md-light">{quizDetail?.quiz_question_count} Questions</span>
              </div>
          </div>
        </div>
      </section>
  )
}

export {QuizDetail}