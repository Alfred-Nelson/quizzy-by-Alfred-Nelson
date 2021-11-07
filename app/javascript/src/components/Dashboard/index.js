import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";
import { Link } from "react-router-dom";

import { QuizApi } from "../../apis/quiz";

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
    <div className="mx-20 my-10 ">
      <div className="flex w-full justify-end">
        <Link to="/quiz/create">
          <Button
            size="large"
            label="Add Quizzes"
            icon={Plus}
            iconPosition="left"
          />
        </Link>
      </div>
      {allQuizzes.length <= 0 && (
        <div className="flex h-64 md:mt-20 w-full justify-center items-center">
          <Typography style="body1">👾 No quizzes</Typography>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
