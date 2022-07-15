import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { useToast, useAuth } from "../../contexts";

const Navbar = () => {
  const { notifyError, notifySuccess } = useToast();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const signoutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
      navigate("/");
      notifySuccess("you have been  successfully logout")
    } catch (error) {
      notifyError("oops Some error occured while signing out");
      console.error(error);
    }
  };

  return (
    <nav className="navbar navbar-fixed flex flex-wrap flex-between  navbar-bg nav-zindex">
      <div className="flex flex-space-evenly flex-align-item-center ">
        <ul className=" text-deocration-none flex flex-wrap flex-align-item-center gap">
          <li className="pb-1 nav-text navbar-white-text flex flex-align-item-center gap-1">
            <span className="material-icons snackbar-icons  navbar-icons">
              menu
            </span>
          </li>
          <Link
            to="/dashboard"
            className="text-deocration-none list-style-none"
          >
            <li className="pb-1  navbar-white-text flex flex-align-item-center gap-1">
              <span className="font-bold">Quiz-Grad</span>
            </li>
          </Link>
        </ul>
      </div>

      <div className="flex flex-space-evenly flex-align-item-center ">
        <ul className=" text-deocration-none flex flex-wrap gap-col-2">
          <Link to="/category" className="text-deocration-none">
            <li className="pb-1 nav-text  navbar-white-text flex flex-align-item-center gap-1">
              <span className="material-icons">category</span>
              <span>Category</span>
            </li>
          </Link>
          <Link to="/dashboard" className="text-deocration-none">
            <li className="pb-1 nav-text  navbar-white-text flex flex-align-item-center gap-1">
              <span className="material-icons">home</span>
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/history" className="text-deocration-none">
            <li className="pb-1 nav-text  navbar-white-text flex flex-align-item-center gap-1">
              <span className="material-icons">history</span>
              <span>Quiz History</span>
            </li>
          </Link>
          <Link to="/Leaderboard" className="text-deocration-none">
            <li className="pb-1 nav-text  navbar-white-text flex flex-align-item-center gap-1">
              <span className="material-icons">person</span>
              <span className="">LeaderBoard</span>
            </li>
          </Link>
          {currentUser === null ? (
            <Link to="/login" className="text-deocration-none">
              <li className="pb-1 nav-text  navbar-white-text flex flex-align-item-center gap-1">
                <span className="material-icons">login </span>
                <span>Login</span>
              </li>
            </Link>
          ) : (
            <div className="text-deocration-none" onClick={signoutUser}>
              <li className="pb-1 nav-text  navbar-white-text flex flex-align-item-center gap-1">
                <span className="material-icons">exit_to_app</span>
                <span>Sign-out</span>
              </li>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export { Navbar };
