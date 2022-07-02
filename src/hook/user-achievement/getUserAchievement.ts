import { useState } from "react";
import { supabase } from "../../../supabaseClient";
import { useToast, useAuth} from "../../contexts";
import {userDetailsDbType, userDetailsType} from "../../components/dashboard/dashboardTypes";
const useAchievementDetail = ()=>{

  const [userDetails, setUserDetails] = useState<userDetailsType[] |null >([]);
  
  const { notifyError } = useToast();
  const { currentUser } = useAuth();  
        
  const getUserDetails = async () => {
    try {
      const { data, error }: userDetailsDbType = await supabase
        .from("achievements")
        .select(
          "quiz_passed, correct_answer, user_booster_level,user_current_stat, users!inner(username, user_profile_image)"
        )
        .eq("id", currentUser?.user.id);

         setUserDetails(data);

      if (error) throw error;
    } catch (error) {
      console.error(error);
      notifyError(error.message);
    }
  };

  
  return { userDetails, getUserDetails, setUserDetails};
}

export {useAchievementDetail}