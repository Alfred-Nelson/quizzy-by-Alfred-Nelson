import React, { useEffect, useState } from "react";

import { Radio, Typography, Button } from "@bigbinary/neetoui/v2";

import { AttemptApi } from "apis/attempt";
import { QuizApi } from "apis/quiz";

const TakeQuiz = ({ slug, attemptId, quizName }) => {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState({});
  const [entered, setEntered] = useState(false);

  const fetchDetails = async () => {
    const response = await QuizApi.getQuizQuestionsBySlug(slug);
    setQuestions(response.data.quiz.questions);
  };

  const handleSubmit = async () => {
    let answerAttributes = [];
    Object.keys(selected).forEach(question_id => {
      let obj = {};
      obj.question_id = question_id;
      obj.marked_answer_id = selected[question_id];
      answerAttributes.push(obj);
    });
    await AttemptApi.update({
      id: attemptId,
      payload: {
        attempt: {
          submitted: true,
          attempt_answers_attributes: answerAttributes,
        },
      },
    });
    setEntered(true);
  };

  const handleRefresh = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    fetchDetails();
    return () => {};
  }, []);

  if (entered) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Typography className="mt-40 mb-10" style="h3">
          You Have Entered the Quiz
        </Typography>
        <Button
          label=" Go back to Login"
          onClick={handleRefresh}
          className=""
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-12 flex justify-center">
        <Typography style="h3">{quizName} quiz</Typography>
      </div>
      {questions.map((question, index) => (
        <div key={index} className="mt-16 ml-10 md:ml-40 flex">
          <Typography style="body2" className="text-gray-500 mr-5">
            Question {index + 1}:
          </Typography>
          <Radio label={question.value} className="space-y-4 mt-1" stacked>
            {question.options.map((option, optionIndex) => (
              <Radio.Item
                key={optionIndex}
                label={option.value}
                value={option.id}
                onChange={e =>
                  setSelected(prev => ({
                    ...prev,
                    [question.id]: e.target.value,
                  }))
                }
                checked={option.id == selected[question.id]}
              />
            ))}
          </Radio>
        </div>
      ))}
      <div className="mt-12 flex justify-center">
        <Button label="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default TakeQuiz;
