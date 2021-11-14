import React from "react";

import { Button } from "@bigbinary/neetoui/v2";

const PublishQuiz = () => {
  const handleClick = () => {};

  return (
    <div className="w-full mt-5">
      <div className="w-full flex justify-end">
        <Button label="Publish" size="large" onClick={handleClick} />
      </div>
    </div>
  );
};

export default PublishQuiz;
