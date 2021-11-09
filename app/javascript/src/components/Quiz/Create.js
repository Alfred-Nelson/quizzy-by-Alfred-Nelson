import React, { useState } from "react";

import { Button, Typography, Input } from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router";

import { QuizApi } from "apis/quiz";

const Create = () => {
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();

  const handleSubmit = async () => {
    await QuizApi.create({ quiz: { name: inputValue } });
    history.push("/");
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <Typography style="h2">Add New Quiz</Typography>
      <Input
        placeholder="Enter quiz name"
        className=" w-64 mt-5 "
        value={inputValue}
        label="Name"
        onChange={e => setInputValue(e.target.value)}
      />
      <Button label="Submit" className="mt-5" onClick={handleSubmit} />
    </div>
  );
};

export default Create;
