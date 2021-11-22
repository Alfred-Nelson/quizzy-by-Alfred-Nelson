import React, { useEffect, useState } from "react";

import { Typography, PageLoader } from "@bigbinary/neetoui/v2";
import { Redirect, useParams } from "react-router";

import { QuizApi } from "apis/quiz";

const PublicPage = () => {
  const [quizName, setQuizName] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  const fetchDetails = async () => {
    setLoading(true);
    const response = await QuizApi.getQuizBySlug(slug);
    setQuizName(response.data.name);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          {quizName != "" ? (
            <Redirect to={`/public/${slug}/attempt/new`} />
          ) : (
            <div className="w-full flex justify-center h-64 mt-20 items center">
              <Typography> 👹 Please Enter an Existing slug </Typography>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PublicPage;
