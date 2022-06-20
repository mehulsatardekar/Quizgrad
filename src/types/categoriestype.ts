import { PostgrestError } from "@supabase/supabase-js";

type QuizCategoriesType = {
  quizid: number;
  quiz_name: string;
  quiz_type: string;
  quiz_image: string;
  quiz_question_count: number;
};

type categoriesType = {
  data:QuizCategoriesType[]
    | null;
  error: PostgrestError | null;
};

type quizCategoriesDetailsType = {
  quizid: number;
  quiz_name: string;
  quiz_type: string;
  quiz_image: string;
  quiz_question_count: number;
  published_time: string | undefined;
  quiz_duration: number;
  quiz_points: number;
};

type CategoriesItems = {
  Categories:QuizCategoriesType[]
    | null
    | undefined;
};
export type {
  categoriesType,
  QuizCategoriesType,
  quizCategoriesDetailsType,
  CategoriesItems,
};
