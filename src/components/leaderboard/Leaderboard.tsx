import React, {useEffect, useState} from "react";
import { supabase } from "../../../supabaseClient";
import { useToast } from "../../contexts";
import  {userDetailsDbType, userDetailsType} from '../dashboard/dashboardTypes';

const Leaderboard = () => {

  const [userDetails, setUserDetails] = useState<userDetailsType[]|null>([]);
  const { notifyError } = useToast();

  const getLeaderBoardDetails = async()=>{
    try {
      const { data, error }: userDetailsDbType = await supabase
        .from("achievements")
        .select(
          "achievement_id,quiz_passed, correct_answer, user_booster_level,user_current_stat, users!inner(username, user_profile_image)"
        ).order('user_booster_level',{ascending:false})
        setUserDetails(data);        
        if(error) throw error;
    } catch (error) {
      notifyError('Something went wrong while fetching data');
      console.error(error.message)
    }
  }

  useEffect( () => {
    getLeaderBoardDetails();
  }, []);

  return (
    <section className="flex flex-justify-center  flex-align-item-center">
     {
        userDetails && (
          <table className="table">
        <thead className="table-head">
          <tr className="table-rows">
            <th className="py">Name</th>
            <th>Correct Answers</th>
            <th>Current Level</th>
          </tr>
        </thead>
        <tbody>
          {
            userDetails.map((userDetail)=>{
              return(
                <tr className="table-rows" key={userDetail.achievement_id}>
                <td className="pt-1">{userDetail.users.username.toUpperCase()}</td>
                <td className="pt-1">{userDetail.correct_answer}</td>
                <td className="pt-1">{userDetail.user_booster_level}</td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
        
        )
     }
    </section>
  );
};

export { Leaderboard };
