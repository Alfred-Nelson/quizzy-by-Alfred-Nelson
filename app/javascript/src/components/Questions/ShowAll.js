import React, { useEffect, useState } from "react";

import { CheckCircle, Edit, Delete } from "@bigbinary/neeto-icons";
import { Typography, Button, Alert } from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router";

import { QuestionApi } from "apis/question";

const ShowAll = ({ questionsArray, fetchQuizDetails, attempts, slug }) => {
  const [editButtonId, setEditButtonId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteQuestion, setDeleteQuestion] = useState(false);
  const color = "text-green-500";
  const history = useHistory();
  const correctStyle = "ml-1 text-green-500";
  const wrongStyle = "ml-1 text-red-500";

  useEffect(() => {
    if (editButtonId) {
      history.push(`/question/${editButtonId}/edit`);
    }
  }, [editButtonId]);

  return (
    <div className="w-full flex justify-center">
      <div className="ml-10 mr-10 my-10 w-3/4 flex flex-col flex-between item-center">
        <Typography style="h3" className="mb-8 w-full flex justify-center">
          {attempts ? "Results" : "Questions"}
        </Typography>
        {questionsArray.map((question, index) => {
          const attemptAnswer = attempts?.filter(
            a => a.question_id == question.id
          );
          return (
            <div key={index} className="my-8">
              <div className="flex justify-between">
                <div className="flex">
                  <Typography style="body1" className="text-gray-800 w-32">
                    Question {index + 1} :
                  </Typography>
                  <Typography
                    style="body1"
                    className="whitespace-pre-wrap max-w-md"
                  >
                    {question.value.trim()}
                  </Typography>
                </div>
                {!attempts && (
                  <div>
                    {!slug && (
                      <>
                        <Button
                          icon={Edit}
                          className="mr-5"
                          style="secondary"
                          onClick={() => setEditButtonId(question.id)}
                        />
                        {/* // history.push(`/question/${e.target.id}/edit`) */}
                        <Button
                          icon={Delete}
                          onClick={() => {
                            setAlertOpen(true);
                            setDeleteQuestion(question.id);
                          }}
                        />
                      </>
                    )}
                  </div>
                )}
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
                    {attemptAnswer?.[0]?.marked_answer_id == option.id ? (
                      <Typography
                        className={
                          attemptAnswer?.[0]?.correct_answer_id == option.id
                            ? correctStyle
                            : wrongStyle
                        }
                      >
                        Your Answer
                      </Typography>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {!attempts && (
        <Alert
          closeButton
          isOpen={alertOpen}
          message="Are you sure you want to Delete the question?"
          onClose={() => {
            setAlertOpen(false);
            setDeleteQuestion(null);
          }}
          onSubmit={async () => {
            await QuestionApi.kill(deleteQuestion);
            setAlertOpen(false);
            setDeleteQuestion(false);
            fetchQuizDetails();
          }}
          title="Delete Question!"
        />
      )}
    </div>
  );
};

export default ShowAll;
