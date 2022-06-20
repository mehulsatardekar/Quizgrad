
type currentUserType = {
        access_token: string;
        user: {
          id: string;
          aud: string;
          role: string;
          email: string;
        };
      };


 type AuthType = {
    currentUser: currentUserType | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<currentUserType | null>>
}


type authProviderContextProps = {
    children : React.ReactNode;
}

export type {AuthType, authProviderContextProps, currentUserType};