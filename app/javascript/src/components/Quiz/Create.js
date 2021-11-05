import React, { useState } from "react";

import { Button, Typography, Input } from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router";

import { QuizApi } from "apis/quiz";

const Create = () => {
  const [input, setInput] = useState("");
  const history = useHistory();

  const handleSubmit = async () => {
    await QuizApi.create({ quiz: { name: input } });
    history.push("/");
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <Typography style="h2">Add New Quiz</Typography>
      <Input
        placeholder="Enter quiz name"
        className=" w-64 mt-5 "
        value={input}
        label="Name"
        onChange={e => setInput(e.target.value)}
      />
      <Button label="Submit" className="mt-5" onClick={handleSubmit} />
    </div>
  );
};

export default Create;
