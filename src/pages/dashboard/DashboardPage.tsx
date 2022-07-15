import React, { useEffect, useState } from "react";

import { Dashboard, Achievements, QuizCategories } from "../../components";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { getCategories } from "../../services/categories";
import { useToast } from "../../contexts";

import { QuizCategoriesType, categoriesType } from "../../types";
import { Toaster } from "react-hot-toast";

const DashboardPage = () => {
  const [quizData, setQuizData] = useState<
    QuizCategoriesType[] | null | undefined
  >();
  const { notifyError } = useToast();

  const getData = async () => {
    try {
      const { data, error }: categoriesType = await getCategories();
      setQuizData(data);
      if (error) throw error;
    } catch (error) {
      console.error(error);
      notifyError("Error While fetching Data from server");
    }
  };

  useEffect(() => {
    getData();
  }, [setQuizData]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <main className="container">
        <Dashboard />
        <section className="flex flex-wrap  qg-gap-5  mt-3 mb-3 mb-3">
          <Achievements />

          <div className="flex flex-column qg-flex-2 gap-1 mt-3">
            <div className="flex flex-between">
              <span className="label-text label-text-primary">
                Featured Category
              </span>
              <Link to="/category" className="label-text label-text-primary">
                See More
              </Link>
            </div>
            <div className="ui-card-default py-1  category-grid shadow-md">
              <QuizCategories Categories={quizData} />
            </div>
          </div>
        </section>
      </main>

    </>
  );
};

export { DashboardPage };
