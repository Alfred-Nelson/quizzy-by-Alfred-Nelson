import React, { useEffect, useState } from "react";

import { useParams } from "react-router";

import { QuizApi } from "apis/quiz";
import PageHeader from "Common/utils/PageHeader";

const Show = () => {
  const [quizName, setQuizName] = useState("");
  const { id } = useParams();

  const fetchQuizDetails = async () => {
    const response = await QuizApi.show(id);
    const data = await response.data;
    const name = data.quiz.name[0].toUpperCase() + data.quiz.name.slice(1);
    setQuizName(name);
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <>
      <PageHeader
        heading={`${quizName} Quiz`}
        buttonValue="Add questions"
        linkTo={`/quiz/${id}/add/question`}
      />
    </>
  );
};

export default Show;
