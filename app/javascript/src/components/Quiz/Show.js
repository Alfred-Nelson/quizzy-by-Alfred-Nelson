import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router";

import { QuizApi } from "apis/quiz";
import PublishQuiz from "Common/PublishQuiz";
import PageHeader from "Common/utils/PageHeader";
import ShowAll from "components/Questions/ShowAll";

const Show = () => {
  const [quizName, setQuizName] = useState("");
  const [quizSlug, setQuizSlug] = useState(null);
  const [questionsArray, setQuestionsArray] = useState([]);
  const { id } = useParams();

  const fetchQuizDetails = async () => {
    const response = await QuizApi.show(id);
    const data = await response.data;
    const name = data.quiz.name[0].toUpperCase() + data.quiz.name.slice(1);
    setQuizName(name);
    setQuizSlug(data.quiz.slug);
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
        icon={Plus}
        linkTo={`/quiz/${id}/add/question`}
      />
      {questionsArray?.length > 0 ? (
        <>
          <PublishQuiz id={id} quizSlug={quizSlug} setQuizSlug={setQuizSlug} />
          <ShowAll
            questionsArray={questionsArray}
            fetchQuizDetails={fetchQuizDetails}
            slug={quizSlug}
          />
        </>
      ) : (
        <div className="mt-10 w-full h-64 flex justify-center items-center">
          <Typography style="body1">🥷🏽 No Questions Added</Typography>
        </div>
      )}
    </>
  );
};

export default Show;
