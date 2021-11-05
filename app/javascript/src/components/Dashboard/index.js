import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";

const Dashboard = () => {
  return (
    <div className="mx-20 my-10 ">
      <div className="flex w-full justify-end">
        <Button
          size="large"
          label="Add Quizzes"
          icon={Plus}
          iconPosition="left"
        />
      </div>
      <div className="flex h-64 md:mt-20 w-full justify-center items-center">
        <Typography style="body1">👾 No quizzes</Typography>
      </div>
    </div>
  );
};

export default Dashboard;
