import { PostgrestError } from '@supabase/supabase-js';

type quizQuestionType = {
    question:string;
    answerIndex:number;
    option:Array<string>;
    points:number;
  }

  type quizDataType = {
    data :{
      quiz_option_answer:quizQuestionType[];
      category: quizCategoryDetailsType
    }[] | null;
    error: PostgrestError | null;
  }

  type quizQuestionPropsType = {
    Question:{question:string; option:string[]};
    Totalquestions: number;
    Currentquestion:number;
    SetAnswer:(index:number|null)=>void
  }

  type quizCategoryDetailsType = {
    quiz_name:string;
    quiz_points:number;
    quiz_question_count:number;
    quiz_type:string;
    quiz_duration:number;
    quizid_relation:string;
 }
  
export type {quizQuestionType, quizDataType, quizQuestionPropsType, quizCategoryDetailsType};