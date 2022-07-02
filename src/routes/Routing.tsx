import React, { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "../components";

import {
  Landing,
  LoginPage,
  DashboardPage,
  CategoryPage,
  SignupPage,
  ProfilePage,
  LeaderboardPage,
  QuizrulePage,
  QuizQuestionsPage,
  QuizResultPage,
  HistoryPage,
} from "../pages/index";

import { ProtectedRoute } from "./ProtectedRoute";

import { ToastContextData, AuthContextData, QuizPlayData } from "../contexts";

const Routings = () => {
  return (
    <Router>
      <ToastContextData>
        <AuthContextData>
          <Navbar />
          <QuizPlayData>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/category" element={<CategoryPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route
                  path="/playquiz/:playquizid"
                  element={<QuizQuestionsPage />}
                />
                <Route path="/result" element={<QuizResultPage />} />

                <Route path="/history" element={<HistoryPage />} />
              </Route>

              <Route path="/signup" element={<SignupPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/quizrule/:quizid" element={<QuizrulePage />} />
            </Routes>
          </QuizPlayData>
        </AuthContextData>
      </ToastContextData>
    </Router>
  );
};

export { Routings };
