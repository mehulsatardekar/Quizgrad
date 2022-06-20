import { PostgrestError } from "@supabase/supabase-js";

type userDetailsType = {
  achievement_id:number;
    quiz_passed: number;
    user_booster_level: string;
    correct_answer: number;
    user_current_stat:number;
    users: {
      username: string;
      user_profile_image: string;
    };
}

type userDetailsDbType = {
  data: userDetailsType[] | null;
  error: PostgrestError | null;
};


export type {userDetailsDbType, userDetailsType}