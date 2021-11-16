import React, { useEffect } from "react";

import { QuizApi } from "apis/quiz";

const TakeQuiz = ({ slug }) => {
  const fetchDetails = async () => {
    const response = await QuizApi.getQuizQuestionsBySlug(slug);
    response;
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return <div>YAAAAAAAY</div>;
};

export default TakeQuiz;
