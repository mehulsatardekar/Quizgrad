import React, { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { v4 as uuidv4 } from "uuid";

import { quizQuestionPropsType, quizQuestionType } from "./quizQuestionTypes";

const QuizQuestions = ({
  Question,
  Totalquestions,
  Currentquestion,
  SetAnswer,
}: quizQuestionPropsType) => {
  const [optionSelected, setOptionSelected] = useState<any>();
  const progressBar = useRef<HTMLDivElement>(null);
  const timer = useRef<any>();

  const gotoNextQuestion = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    flushSync(() => {
      SetAnswer(optionSelected);
      setOptionSelected(null);
    });
  };

  useEffect(() => {
    if (progressBar.current !== null) {
      progressBar.current!.classList.remove("active");

      setTimeout(() => {
        progressBar.current!.classList.add("active");
      }, 0);
    }

    //clearInterval(timer);
    timer.current = setTimeout(gotoNextQuestion, 10 * 1000);

    return () => {
      gotoNextQuestion;
      clearTimeout(timer.current);
    };
  }, [Question]);

  return (
    <section>
      {Question && (
        <>
          <div className="flex flex-between py-1">
            <div className="flex flex-column gap-1">
              <span className="font-bold  label-text label-text-primary">
                Travel Mania Wonderland
              </span>
              <span className="font-md-light">
                Question {Currentquestion}/{Totalquestions}
              </span>
            </div>
            <div>
              <button className="btn-primary btn btn-sm ">Submit Quiz</button>
            </div>
          </div>
          <section className="flex  flex-justify-center flex-align-item-center">
            <div className="ui-card-default width-half card-py ">
              <div className="progress-bar" ref={progressBar}></div>

              <div className="ui-card-text card-mb-1 ">
                <section className="flex flex-justify-center width-full ">
                  <div className="flex flex-column gap-2 pt-1 ">
                    <span className="font-bold font-weight-800 font-sm line-space-2">
                      {Question.question}
                    </span>
                    {Question.option.map((option: string, index: number) => {
                      return (
                        <label
                          htmlFor={`ids_ ${index}`}
                          className="btn-outline-primary btn btn-py-1 flex flex-justify-center gap"
                          key={uuidv4()}
                        >
                          {option}
                          <input
                            type="radio"
                            className={`option-radio ${
                              index == optionSelected
                                ? "option active"
                                : "option"
                            }`}
                            id={`ids_ ${index}`}
                            name="ts"
                            value={option}
                            onClick={() => setOptionSelected(index)}
                          />
                        </label>
                      );
                    })}
                  </div>
                </section>
              </div>

              <div className="flex flex-justify-center flex-align-item-center mt-2 mb-1">
                <button
                  className="btn-dark btn btn-py-1 flex flex-justify-center flex-align-item-center"
                  onClick={gotoNextQuestion}
                >
                  <span>Next</span>
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </section>
  );
};

export { QuizQuestions };
