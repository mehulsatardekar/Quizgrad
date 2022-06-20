import { PostgrestError } from "@supabase/supabase-js";

type userHistoryTypes = {
  quiz_history_id: number;
  quiz_name: string;
  quiz_score: number;
  quiz_attempted_date: string;
  user_score: number;
  quiz_passed: boolean;
};

type userHistoryDbTypes = {
  data: userHistoryTypes[] | null;
  error: PostgrestError | null;
};

export type { userHistoryTypes, userHistoryDbTypes };
