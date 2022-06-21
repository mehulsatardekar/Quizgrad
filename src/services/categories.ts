import { supabase } from "../../supabaseClient";

import { categoriesType } from "../types";

const getCategories = async()=>{
    const  { data,error}:categoriesType = await supabase
    .from('category')
   return {data, error}
}

export {getCategories};