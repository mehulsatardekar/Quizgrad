import { PostgrestError } from "@supabase/supabase-js";
import React, { useCallback, useEffect, useState } from "react";
import { useToast, useAuth } from "../../contexts";

import {useAchievementDetail} from '../../hook/';

const Dashboard = () => {  
  const {currentUser} =  useAuth();
  const { userDetails, getUserDetails, setUserDetails} = useAchievementDetail();
  const { notifyError } = useToast();
  
  useEffect( () => {
  
    getUserDetails();
  }, []);
  
  
  return (
    <>
     {
         userDetails && (
            <section className="ui-card-default  flex flex-wrap  gap  mt-3 py qg-flex-column shadow-md">
            <div className="qg-flex-1 width-full pt-1 pb-1 flex flex-wrap">
              <img
                className="user-profile"
                src={userDetails[0]?.users?.user_profile_image}
                alt={userDetails[0]?.users?.username}
              />
            </div>
            <div className="qg-flex-5  flex flex-column space-between gap-2 pt-1 pb-1">
              <div className="users flex flex-column gap-1 ">
                <span className="font-sm font-mid-bold pb-01 label-text ">
                {userDetails[0]?.users?.username.toUpperCase()}
                </span>
                <span className="font-mid-light label-text label-text-primary font-bold">
                  Bonus booster {userDetails[0]?.user_booster_level} level
                </span>
              </div>
              <div className="flex flex-column gap-1 pb-1">
                <progress
                  className="slider-primary width-full"
                  value={userDetails[0]?.user_current_stat}
                  max="100"
                  title={`Current streak ${userDetails[0]?.user_current_stat.toString()}`}
                ></progress>
              </div>
              <div className="user-dashboard flex flex-wrap flex-row qg-gap-5 ">
                <div className="flex flex-align-item-center gap">
                  <div className="bg">
                    <i className="bx bxs-flag-alt dashboard-icons"></i>
                  </div>
                  <div className="flex flex-column gap-1">
                    <span className="font-mid-bold label-text label-text-primary">
                      {userDetails[0]?.quiz_passed}
                    </span>
                    <span className="font-mid-light">Quiz Passed</span>
                  </div>
                </div>
      
                <div className="flex flex-align-item-center gap">
                  <div className="bg">
                    <i className="bx bxs-check-circle dashboard-icons"></i>
                  </div>
                  <div className="flex flex-column gap-1">
                    <span className="font-mid-bold label-text label-text-primary">
                    {userDetails[0]?.correct_answer}
                    </span>
                    <span className="font-mid-light">Correct Answered</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
         )
     }
    </>
  );
};

export { Dashboard };
