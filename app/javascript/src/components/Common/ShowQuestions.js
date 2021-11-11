import React from "react";

import { CheckCircle, Edit, Delete } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";

const ShowQuestions = ({ questionsArray }) => {
  const color = "text-green-500";

  return (
    <div className="w-full flex justify-center">
      <div className="ml-10 mr-10 my-10 w-3/4 flex flex-col flex-between item-center">
        <Typography style="h3" className="mb-8 w-full flex justify-center">
          Questions
        </Typography>
        {questionsArray.map((question, index) => (
          <div key={index} className="my-8">
            <div className="flex justify-between">
              <div className="flex">
                <Typography style="body1" className="text-gray-600 w-32">
                  Question {index + 1} :
                </Typography>
                <Typography
                  style="body1"
                  className="whitespace-pre-wrap max-w-md"
                >
                  {question.value.trim()}
                </Typography>
              </div>
              <div>
                <Button icon={Edit} className="mr-5" style="secondary" />
                <Button icon={Delete} />
              </div>
            </div>
            <div className="mt-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex">
                  <Typography style="body1" className="text-gray-500 w-32">
                    Option {optionIndex + 1} :
                  </Typography>
                  <Typography
                    style="body1"
                    className={`${option.answer ? color : ""} ml-5 mr-3`}
                  >
                    {option.value}
                  </Typography>
                  {option.answer ? (
                    <CheckCircle size={16} className="mt-1" color="#00D100" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowQuestions;
