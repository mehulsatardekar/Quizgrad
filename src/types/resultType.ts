type userResultType = {
    useranswers:Array<number|null|undefined>;
    quizes: {answerIndex:number, option:string[], points:number, question:string}[];
    score:number;
    isPassed:boolean;
    quizdetail: {quiz_name:string;
        quiz_points:number;
        quiz_question_count:number;
        quiz_type:string;
        quiz_duration:number;
        quizid_relation:string;}
}

export type {userResultType}