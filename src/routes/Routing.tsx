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
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/quizrule/:quizid" element={<QuizrulePage />} />
              <Route
                path="/playquiz/:playquizid"
                element={
                  <ProtectedRoute>
                    <QuizQuestionsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/result"
                element={
                  <ProtectedRoute>
                    <QuizResultPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <HistoryPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </QuizPlayData>
        </AuthContextData>
      </ToastContextData>
    </Router>
  );
};

export { Routings };
