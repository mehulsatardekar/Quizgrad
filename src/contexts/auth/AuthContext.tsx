import { Session } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { AuthType, authProviderContextProps ,currentUserType } from "./AuthType";

const Authentication = createContext<AuthType | null>(null);


const AuthContextData = ({ children }: authProviderContextProps) => {
  const userToken = JSON.parse(localStorage.getItem("supabase.auth.token")!);
  const session = supabase.auth.session();
  
  const [currentUser, setCurrentUser] = useState<currentUserType | null >(
     userToken ? userToken.currentSession : null
  );
 

  useEffect(() => {    
     if ( (session!) === null) {
       setCurrentUser(session);
     }

    const subscriber = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_OUT":
          {
            if (session! == null) {
              setCurrentUser(session);
            }
          }
          break;
        case "SIGNED_IN":
          {
            if (session! == null) {
              setCurrentUser(session);
            }
          }
          break;

        default:
          console.log("no change in event");
      }
    });

    return ()=>{subscriber};
  }, [setCurrentUser, currentUser]);

  //console.log(currentUser?.currentSession.user.id)
  return (
    <Authentication.Provider value={{ currentUser,setCurrentUser }}>
      {children}
    </Authentication.Provider>
  );
};

const useAuth = () => useContext(Authentication) as AuthType;

export { AuthContextData, useAuth };
