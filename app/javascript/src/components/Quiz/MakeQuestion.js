import React, { useState, useEffect } from "react";

import { useParams } from "react-router";

import { QuizApi } from "apis/quiz";
import PageHeader from "Common/utils/PageHeader";
import Quiz from "Form/Quiz";

const MakeQuestion = () => {
  const [quizName, setQuizName] = useState("");
  const [optionsObject, setOptionsObject] = useState([]);
  const [numberOfOptions, setNumberOfOptions] = useState(2);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const { id } = useParams();

  const fetchQuizDetails = async () => {
    const response = await QuizApi.show(id);
    const data = await response.data;
    const name = data.quiz.name[0].toUpperCase() + data.quiz.name.slice(1);
    setQuizName(name);
  };

  const handleChange = (e, index) => {
    const data = optionsObject;
    data[index] = e.target.value;
    setOptionsObject([...data]);
  };

  const handleRemove = (e, index) => {
    const data = optionsObject;
    data.splice(index, 1);
    setOptionsObject([...data]);
    setNumberOfOptions(prev => prev - 1);
    if (correctAnswer?.value === index) {
      setCorrectAnswer(null);
    } else if (correctAnswer?.value > index) {
      setCorrectAnswer({
        label: `option ${correctAnswer.value}`,
        value: correctAnswer.value - 1,
      });
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <div>
      <PageHeader
        heading={`${quizName} Quiz`}
        linkTo={`/quiz/${id}/add/question`}
      />
      <Quiz
        array={Array(numberOfOptions).fill()}
        optionsObject={optionsObject}
        numberOfOptions={numberOfOptions}
        setNumberOfOptions={setNumberOfOptions}
        handleChange={handleChange}
        handleRemove={handleRemove}
        correctAnswer={correctAnswer}
        setCorrectAnswer={setCorrectAnswer}
      />
    </div>
  );
};

export default MakeQuestion;
