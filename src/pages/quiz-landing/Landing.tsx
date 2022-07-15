import React from "react";
import { Toaster } from "react-hot-toast";

import { Link } from "react-router-dom";

import "./landing.css";
const Landing = () => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <main className="homepage-container">
        <section className="home-txt-container">
          <div className="flex flex-column gap flex-justify-center flex-align-item-center h-100 ">
            <h3 className="home-txt label-text-primary">
              Learn New Concept each Minutes.
            </h3>
            <p className="home-txt-descr">
              We help you prepare for exams and quizzes
            </p>
            <Link to="/login" className="btn-primary btn btn-py-1">
              Start Learning
            </Link>
          </div>
        </section>
        <section className="home-banner"></section>
      </main>
    </>
  );
};

export { Landing };
