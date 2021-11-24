import React, { useEffect, useState } from "react";

import { Typography, PageLoader } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

import { AttemptApi } from "apis/attempt";
import { QuizApi } from "apis/quiz";
import ShowAll from "components/Questions/ShowAll";

const ShowQuiz = ({ quizId, attemptId, quizName }) => {
  const [questions, setQuestions] = useState(null);
  const [attempts, setAttempts] = useState(null);
  const [noOfCorrect, setNoOfCorrect] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await QuizApi.showStandard(quizId);
      const res = await AttemptApi.show(attemptId);
      setQuestions(response.data.quiz.questions.sort((a, b) => a.id - b.id));
      setAttempts(
        res.data.attempt.attempted.sort((a, b) => a.question_id - b.question_id)
      );
      setNoOfCorrect(res.data.attempt.correct_answer_count);
    } catch (error) {
      Logger.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails();
    return () => {};
  }, []);

  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <Typography style="h3">{quizName} quiz</Typography>
          <div className="flex mt-5">
            <Typography className="mr-5">
              {" "}
              correct answers: {noOfCorrect}
            </Typography>
            <Typography className="mr-5">
              {" "}
              incorrect answers: {attempts?.length - Number(noOfCorrect)}
            </Typography>
            <Typography>
              {" "}
              unattempted answers: {questions?.length - attempts?.length}
            </Typography>
          </div>
          {questions?.length > 0 && attempts?.length >= 0 && (
            <ShowAll questionsArray={questions} attempts={attempts} />
          )}
        </>
      )}
    </div>
  );
};

export default ShowQuiz;
