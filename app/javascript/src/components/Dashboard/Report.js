import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";

import { QuizApi } from "apis/quiz";
import PageHeader from "Common/utils/PageHeader";
import Table from "components/Dashboard/Table";
import { REPORT_COLUMN } from "constants/column";

const Report = () => {
  const [allReports, setAllReports] = useState([]);

  const fetchDetails = async () => {
    const response = await QuizApi.list();
    const data = await response.data;
    let necessaryData = [];
    data.quiz.forEach(quiz => {
      quiz.report.forEach(attempt => {
        if (attempt) {
          necessaryData.push({
            user_name: attempt.user_name,
            email: attempt.email,
            correct_answer_count: attempt.correct_answer_count,
            incorrect_answer_count: attempt.incorrect_answer_count,
            quiz_name: quiz.name,
          });
        }
      });
    });
    setAllReports(necessaryData);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <PageHeader heading="Report" buttonValue="Download" icon={Download} />
      {allReports.length <= 0 ? (
        <div className="flex h-64 md:mt-20 w-full justify-center items-center">
          <Typography style="body1">🐶 No one attempted your Quiz</Typography>
        </div>
      ) : (
        <Table
          allQuizzes={allReports}
          fetchDetails={fetchDetails}
          column={REPORT_COLUMN}
          buttonShouldAppear={false}
        />
      )}
    </div>
  );
};

export default Report;
