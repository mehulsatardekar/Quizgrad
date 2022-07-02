import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';
import {useToast, useAuth} from '../../contexts';
import {convertDateToMonthAndYear} from '../../utils/dateFormatter'
import  { userHistoryTypes, userHistoryDbTypes } from './historyTypes';

const History = () => {
    const [userQuizHistories , setUserQuizHistories] = useState<userHistoryTypes[]>([]);
    const {notifySuccess,notifyError} = useToast();
    const {currentUser} =  useAuth();

    const getUserQuizHistory = async()=>{
        
        try{
            const {data, error}: userHistoryDbTypes = await supabase.from('user_quiz_history').select('quiz_history_id,quiz_name, quiz_score, quiz_attempted_date, user_score,quiz_passed')
            .eq('userid', currentUser?.user.id).order('quiz_history_id',{ascending:false});
            if(data !==  null){
                setUserQuizHistories(data);
            }
            if(error) throw error;
        }catch(error){
            notifyError('Something went wrong while fetching data.');
            console.error(error);
        }
    }

    useEffect(()=>{
      getUserQuizHistory();
    },[])

  return (
    <section>
       <div className="flex flex-between  flex-align-item-center pb-1">
           <h1>Your Progress</h1>
           <h3 className='font-ex-sm'>Scores</h3>
       </div>
       <hr />   
       {
        (userQuizHistories.length>0)?(
            userQuizHistories.map(userQuizHistory =>{
                return(
                 <div className='flex flex-between flex-wrap flex-align-item-center  py-1 history-card mt-1 mb-1' key={userQuizHistory.quiz_history_id}>
                     <div className='flex flex-column gap-1'>
                     <h1 className='label-text-primary'>{userQuizHistory.quiz_name}</h1>
                     <div className='flex flex-wrap flex-row gap'>
                     <div className='flex flex-row flex-wrap gap-1'>
                         <span>Quiz-Result:</span>
                         <span className={`font-ex-sm font-bold ${(userQuizHistory.quiz_passed)?'label-text-success':'label-text-danger'}`}>{(userQuizHistory.quiz_passed)?'Passed':'Failed'}</span>
                     </div>
                     <span className='font-ex-sm'>{convertDateToMonthAndYear('en-US',userQuizHistory.quiz_attempted_date)}</span>
                     </div>
                     </div>
                     <div>
                         <span className='font-bold  text-gray'>{userQuizHistory.user_score}/{userQuizHistory.quiz_score}</span>
                     </div>
                 </div>
                )
            } )
        ):(
            <>
              <div className='flex flex-column flex-wrap flex-justify-center flex-align-item-center mt-2 gap'>
                  <h1> You haven't played any quiz. play quiz to see the history.</h1>
                   <Link to="/category" className='btn-primary btn btn-sm'>See Categories</Link>
              </div>
            </>
        )
       }
    </section>
  )
}

export {History}