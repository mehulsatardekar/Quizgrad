import React from "react";
import { Link } from "react-router-dom";
import { CategoriesItems } from "../../types";

const QuizCategories = ({ Categories }: CategoriesItems) => {
  return (
    <>
      {Categories?.map((category) => {
        return (
          <Link to={`/quizrule/${category.quizid}`}>
            <div className="flex relative" key={category.quizid}>
              <img
                src={`https://images.weserv.nl/?url=${category.quiz_image}`}
                alt={category.quiz_name}
                loading="lazy"
                className="img-category"
                height={230}
                width={330}
              />
              <div className="img-text">
                <span>{category.quiz_name}</span>
              </div>
              <div className="img-text-right">
                <span>{category.quiz_question_count} Questions</span>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export { QuizCategories };
