import React from "react";

import { Button, Typography } from "@bigbinary/neetoui/v2";

import { QuizApi } from "apis/quiz";

const PublishQuiz = ({ id, quizSlug, setQuizSlug }) => {
  const handleClick = async () => {
    const response = await QuizApi.publish(id);
    const a = await response.data;
    setQuizSlug(a.slug);
  };

  return (
    <div className="w-full mt-5 flex justify-between items-center">
      {quizSlug && (
        <div>
          <Typography className="text-blue-400">
            {window.location.host}/public/{quizSlug}
          </Typography>
        </div>
      )}
      <div className={quizSlug ? null : "w-full flex justify-end"}>
        <Button
          label={quizSlug ? "Published" : "Publish"}
          size="large"
          onClick={handleClick}
          disabled={quizSlug}
        />
      </div>
    </div>
  );
};

export default PublishQuiz;
