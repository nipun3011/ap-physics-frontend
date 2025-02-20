import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Question {
    userID: string;
    quesID: string;
    topic: string;
    description: string;
    options: string[];
    response: number | null;
}

interface QuestionProp {
    question: Question | undefined;
}

const Topbar = ({ question }: QuestionProp) => {
    return (
        <div>
            <h1>{question?.topic}</h1>
        </div>
    );
};

const Panel = ({ question }: QuestionProp) => {
    return (
        <div className="questionCard">
            <text className="questionHeading">{question?.description}</text>
            {question?.options.map((option, index) => (
                <button className="questionOptionsEn" key={index}>{option}</button>
            ))}
            <div className="questionActions">
                <button className="actionButton">Show Hint</button>
                <button className="actionButton">Submit</button>
            </div>
        </div>
    );
};

const Page = () => {

    const params = useParams();
    console.log(params.quesID);
    const [question, setQuestion] = useState<Question>()

    useEffect(() => {

        const loadQues = async () => {
            fetch(`http://localhost:8000/get-ques-by-id/${params.quesID}`)
                .then((response) => response.json())
                .then((data) => {
                    setQuestion(data);
                })
                .catch((error) => console.error("Error fetching question:", error));
        };
        loadQues();
    }, []);

    return (
        <div className="questionContainer">
            <Topbar question={question} />
            <Panel question={question} />
        </div>
    );
};

export default Page;