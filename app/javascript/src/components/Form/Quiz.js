import React from "react";

import { Close } from "@bigbinary/neeto-icons";
import {
  Textarea,
  Input,
  Button,
  Select,
  Typography,
} from "@bigbinary/neetoui/v2";

const Quiz = ({
  array,
  textareaValue,
  setTextareaValue,
  optionsObject,
  numberOfOptions,
  setNumberOfOptions,
  handleRemove,
  handleChange,
  correctAnswer,
  setCorrectAnswer,
  handleSubmit,
}) => {
  return (
    <div className="w-full">
      <Textarea
        label="Question"
        placeholder="Enter the Question"
        rows={3}
        className="mt-10"
        value={textareaValue}
        onChange={e => setTextareaValue(e.target.value)}
      />
      <div className="w-full flex flex-col items-center">
        {array.map((_, index) => (
          <div key={index} className="w-3/4 flex justify-around mt-10 ">
            <span className="mt-2">{`option ${index + 1}`}</span>
            <div className="w-3/4 flex justify-between">
              <div className="w-11/12">
                <Input
                  value={optionsObject[index] ? optionsObject[index] : ""}
                  onChange={e => handleChange(e, index)}
                />
              </div>
              <div className="max-h-4 mt-1">
                {numberOfOptions > 2 && (
                  <button
                    type="button"
                    className="bg-red-200 hover:bg-red-500 px-1 py-1 rounded-2xl outline-none"
                    onClick={e => handleRemove(e, index)}
                  >
                    <Close color="white" size="12" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {numberOfOptions < 4 && (
          <Button
            label="Add Options"
            className="mt-10"
            onClick={() => {
              setNumberOfOptions(prev => prev + 1);
            }}
          />
        )}

        <Typography className="mt-10">Correct Answer</Typography>

        <Select
          className="w-1/2"
          value={correctAnswer}
          onChange={e => setCorrectAnswer(e)}
          options={array.map((_, index) => ({
            label: `option ${index + 1}`,
            value: index,
          }))}
        />

        <button
          className="mt-10 rounded p-2 bg-gradient-to-b from-yellow-300 to-yellow-500 hover:bg-gradient-to-b hover:from-yellow-200 hover:via-yellow-300 hover:to-yellow-500"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Quiz;
