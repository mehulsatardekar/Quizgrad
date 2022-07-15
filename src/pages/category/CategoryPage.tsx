import React, { useState, useEffect } from "react";
import { QuizCategories } from "../../components";
import "./categorypage.css";
import { QuizCategoriesType } from "../../types";
import { getCategories } from "../../services/categories";
import { useToast } from "../../contexts";
import { Toaster } from "react-hot-toast";

const CategoryPage = () => {
  const [quizData, setQuizData] = useState<
    QuizCategoriesType[] | null | undefined
  >([]);

  const { notifyError } = useToast();

  const getData = async () => {
    try {
      const { data, error } = await getCategories();
      setQuizData(data);

      if (error) throw error;
    } catch (error) {
      console.error(error.message);
      notifyError('Error While fetching Data from Server');
    }
  };

  useEffect(() => {
    getData();
  }, [setQuizData]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <main className="container">
        <section className="flex flex-wrap flex-column   mt-3 mb-3">
          <div className="flex flex-column gap-1 mb-3">
            <span className="font-bold font-weight-800 font-sm">
              Select Topic
            </span>
            <span className="font-md-light">Featured Category</span>
          </div>

          <div className="flex flex-wrap gap flex-justify-center ">
            <QuizCategories Categories={quizData} />
          </div>
        </section>
      </main>
    </>
  );
};

export { CategoryPage };
