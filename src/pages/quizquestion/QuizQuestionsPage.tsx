import React, { useState } from "react";

import { QuizMain, QuizResult } from "../../components";
import { useParams } from "react-router-dom";
import "./quiz-question-page.css";

const QuizQuestionsPage = () => {
  
  return (
    <main className="container">
       <QuizMain/>
    </main>
  );
};

export { QuizQuestionsPage };
