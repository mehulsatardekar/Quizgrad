
type quizPlayProviderContextProps = {
    children : React.ReactNode;
}

type QuizPlayType ={
    isQuizStarted: boolean;
    setIsQuizStarted : React.Dispatch<React.SetStateAction<boolean>>;
}
export type {quizPlayProviderContextProps, QuizPlayType}