import React, { useState } from "react";

import { Button, Typography, Input } from "@bigbinary/neetoui/v2";

const Create = () => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {};

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
      <Button label="Submit" className="mt-5" oncClick={handleSubmit} />
    </div>
  );
};

export default Create;
