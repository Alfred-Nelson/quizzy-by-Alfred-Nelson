import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import { QuizApi } from "apis/quiz";
import PageHeader from "Common/utils/PageHeader";

import Table from "./Table";

const Dashboard = () => {
  const [allQuizzes, setAllQuizzes] = useState([]);

  const fetchDetails = async () => {
    const response = await QuizApi.list();
    const data = await response.data;
    setAllQuizzes(data.quiz);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <PageHeader
        heading="List Of Quizzes"
        buttonValue="Add Quizzes"
        linkTo="/quiz/create"
      />
      {allQuizzes.length <= 0 ? (
        <div className="flex h-64 md:mt-20 w-full justify-center items-center">
          <Typography style="body1">👾 No quizzes</Typography>
        </div>
      ) : (
        <Table allQuizzes={allQuizzes} fetchDetails={fetchDetails} />
      )}
    </>
  );
};

export default Dashboard;
