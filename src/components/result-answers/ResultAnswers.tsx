import React, { useState } from "react";
import { useId } from "react";
import { useLocation } from "react-router-dom";
import { userResultType } from "../../types";
import { confettiCelebration } from "../../utils/";
import { v4 as uuidv4 } from "uuid";

const ResultAnswers = () => {
  const id = useId();
  const location = useLocation();
  const { useranswers, quizes, quizdetail, score, isPassed } =
    location.state as userResultType;

  let userOpt: number | null | undefined;

  if (isPassed) {
    confettiCelebration();
  }
  return (
    <>
      {quizes.map((quiz, i) => {
        userOpt = useranswers[i];
        return (
          <div className="flex flex-column gap-2 mb-3 mt-3">
            <div className="flex flex-between flex-align-item-center">
              <div className="flex flex-column">
                <span className="label-text label-text-primary font-sm">
                  Question {i + 1}
                </span>
                <span className="label-text ">Quiz Marks {quiz.points}</span>
              </div>
              <span className="label-text label-text-success">
                You Scored:{userOpt === quiz.answerIndex ? quiz.points : 0}
              </span>
            </div>
            <span className="font-bold font-weight-800 font-sm">
              {quiz.question}
            </span>

            {quiz.option.map((option, optionIndex) => {
              return (
                <span
                  key={uuidv4()}
                  className={`btn btn-py-1 flex flex-justify-center disable-btn disable 
                       ${
                         optionIndex === userOpt && userOpt === quiz.answerIndex
                           ? "btn-success"
                           : optionIndex === userOpt &&
                             userOpt !== quiz.answerIndex
                           ? "btn-danger"
                           : optionIndex == quiz.answerIndex
                           ? "btn-success"
                           : " btn-outline-primary disable-text"
                       }
                      `}
                >
                  <span className="icon-default-pl">{option}</span>
                </span>
              );
            })}
          </div>
        );
      })}
      <hr />
    </>
  );
};

export { ResultAnswers };
