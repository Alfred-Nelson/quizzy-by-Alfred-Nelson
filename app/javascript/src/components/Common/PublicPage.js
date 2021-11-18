import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { Redirect, useParams } from "react-router";

import { QuizApi } from "apis/quiz";

const PublicPage = () => {
  const [quizName, setQuizName] = useState("");
  const { slug } = useParams();

  const fetchDetails = async () => {
    const response = await QuizApi.getQuizBySlug(slug);
    setQuizName(response.data.name);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      {quizName != "" ? (
        <Redirect to={`/public/${slug}/attempt/new`} />
      ) : (
        <div className="w-full flex justify-center h-64 mt-20 items center">
          <Typography> 👹 Please Enter an Existing slug </Typography>
        </div>
      )}
    </div>
  );
};

export default PublicPage;
