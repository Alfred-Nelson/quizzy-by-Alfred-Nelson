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
  }, []);

  if (entered) {
    return (
      <div>
        <Typography> You Have Entered the Quiz </Typography>
        <Button label=" You Have Entered the Quiz " onClick={handleRefresh} />
      </div>
    );
  }

  return (
    <div>
      <Typography style="h3">{quizName} quiz</Typography>
      {questions.map((question, index) => (
        <div key={index} className="mt-10">
          <Radio label={question.value} className="space-y-4" stacked>
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
      <Button label="Submit" className="mt-12" onClick={handleSubmit} />
    </div>
  );
};

export default TakeQuiz;
