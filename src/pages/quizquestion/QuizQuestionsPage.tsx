import React, { useState } from "react";

import { QuizMain } from "../../components";
import { useParams } from "react-router-dom";
import "./quiz-question-page.css";
import { Toaster } from "react-hot-toast";

const QuizQuestionsPage = () => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <main className="container">
        <QuizMain />
      </main>
    </>
  );
};

export { QuizQuestionsPage };
