import React, { useEffect, useState } from "react";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";
import '../index.css';
import { NavLink } from "react-router-dom";


interface Question {
  userID: string;
  quesID: string;
  topic: string;
  description: string;
  options: string[];
  response: number | null;
}

interface TabProps {
  solved: boolean;
  setType: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tabs = ({ solved, setType }: TabProps) => {
  return (
    <div className="questionStatus">
      <button className={`statusButton ${solved ? '' : 'statusButtonActive'}`} onClick={() => setType(false)}>Unsolved</button>
      <button className={`statusButton ${solved ? 'statusButtonActive' : ''}`} onClick={() => setType(true)}>Solved</button>
    </div>
  );
}

const QuestionList = ({ solved, setType }: TabProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    solved ? fetch("http://localhost:8000/get-ques-s")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching questions:", error))
      :
      fetch("http://localhost:8000/get-ques-u")
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching questions:", error));
  }, [solved]);

  if (loading) return <Dots />

  return (
    <div className="questionList">
      {
        questions.map((question, index) => (
          <div key={index} className="questionCard">
            <text className="questionHeading">Q.{index + 1} {question.description}</text>
            {question.options.map((option, index) => (
              <text className="questionOptionsDis" key={index}>{option}</text>
            ))}
            {solved ? <span className="responseCont">Response</span> : <NavLink className="solveButton" to={`/qs/${question.quesID}`}>Solve</NavLink>}
          </div>
        ))
      }
    </div>
  );
}

const Questionnare = () => {
  const [solved, setType] = useState<boolean>(false);

  return (
    <div className="questionContainer">
      <Tabs solved={solved} setType={setType} />
      <QuestionList solved={solved} setType={setType} />
    </div>
  )
}

export default Questionnare;