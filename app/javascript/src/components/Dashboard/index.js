import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, PageLoader } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

import { QuizApi } from "apis/quiz";
import PageHeader from "Common/utils/PageHeader";
import { DASHBOARD_COLUMN } from "constants/column";

import Table from "./Table";

const Dashboard = () => {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    try {
      const response = await QuizApi.list();
      const data = await response.data;
      setAllQuizzes(data.quiz);
    } catch (error) {
      Logger.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchDetails();
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <PageLoader />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Dashboard;
