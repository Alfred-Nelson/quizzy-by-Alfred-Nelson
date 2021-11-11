import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router";

import { QuizApi } from "apis/quiz";
import ShowQuestions from "Common/ShowQuestions";
import PageHeader from "Common/utils/PageHeader";

const Show = () => {
  const [quizName, setQuizName] = useState("");
  const [questionsArray, setQuestionsArray] = useState([]);
  const { id } = useParams();

  const fetchQuizDetails = async () => {
    const response = await QuizApi.show(id);
    const data = await response.data;
    const name = data.quiz.name[0].toUpperCase() + data.quiz.name.slice(1);
    setQuizName(name);
    setQuestionsArray(data.quiz.questions);
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
      {questionsArray?.length > 0 ? (
        <ShowQuestions questionsArray={questionsArray} />
      ) : (
        <div className="mt-10 w-full h-64 flex justify-center items-center">
          <Typography style="body1">🥷🏽 No Questions Added</Typography>
        </div>
      )}
    </>
  );
};

export default Show;
