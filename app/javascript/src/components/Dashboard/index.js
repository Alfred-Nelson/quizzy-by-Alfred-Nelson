import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";

import { QuizApi } from "apis/quiz";
import PageHeader from "Common/utils/PageHeader";
import { DASHBOARD_COLUMN } from "constants/column";

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
    <div className="w-full">
      <PageHeader
        heading="List Of Quizzes"
        buttonValue="Add Quizzes"
        linkTo="/quiz/create"
        icon={Plus}
      />
      {allQuizzes.length <= 0 ? (
        <div className="flex h-64 md:mt-20 w-full justify-center items-center">
          <Typography style="body1">👾 No quizzes</Typography>
        </div>
      ) : (
        <Table
          allQuizzes={allQuizzes}
          fetchDetails={fetchDetails}
          column={DASHBOARD_COLUMN}
          buttonShouldAppear={true}
        />
      )}
    </div>
  );
};

export default Dashboard;
