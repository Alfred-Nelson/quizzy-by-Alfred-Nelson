import { TOASTR_OPTIONS } from "constants";

import React, { useState, useEffect } from "react";

import { useParams } from "react-router";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import { QuestionApi } from "apis/question";
import { QuizApi } from "apis/quiz";
import PageHeader from "Common/utils/PageHeader";
import Question from "Form/Question";

const Make = () => {
  const [quizName, setQuizName] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [optionsObject, setOptionsObject] = useState(["", ""]);
  const [numberOfOptions, setNumberOfOptions] = useState(2);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  const fetchQuizDetails = async () => {
    const response = await QuizApi.show(id);
    const data = await response.data;
    const name = data.quiz.name[0].toUpperCase() + data.quiz.name.slice(1);
    setQuizName(name);
  };

  const handleChange = (e, index) => {
    const data = optionsObject;
    data[index] = e.target.value;
    setOptionsObject([...data]);
  };

  const handleRemove = index => {
    const data = optionsObject;
    data.splice(index, 1);
    setOptionsObject([...data]);
    setNumberOfOptions(prev => prev - 1);
    if (correctAnswer?.value === index) {
      setCorrectAnswer(null);
    } else if (correctAnswer?.value > index) {
      setCorrectAnswer({
        label: `option ${correctAnswer.value}`,
        value: correctAnswer.value - 1,
      });
    }
  };

  const callCreateApi = async result => {
    await QuestionApi.create({
      question: {
        value: textareaValue,
        quiz_id: id,
        options_attributes: result,
      },
    });
    history.push(`/quiz/${id}/show`);
  };

  const handleSubmit = () => {
    if (
      optionsObject.length !== numberOfOptions ||
      optionsObject.includes("")
    ) {
      toast.error("Options cannot be blank", TOASTR_OPTIONS);
    } else if (!correctAnswer) {
      toast.error("Select a Correct answer", TOASTR_OPTIONS);
    } else if (textareaValue == "") {
      toast.error("Question cannot be blank", TOASTR_OPTIONS);
    } else {
      const result = optionsObject.map((val, index) => {
        return { value: val, answer: correctAnswer.value == index };
      });
      callCreateApi(result);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <div>
      <PageHeader
        heading={`${quizName} Quiz`}
        linkTo={`/quiz/${id}/add/question`}
      />
      <Question
        array={Array(numberOfOptions).fill()}
        textareaValue={textareaValue}
        setTextareaValue={setTextareaValue}
        optionsObject={optionsObject}
        numberOfOptions={numberOfOptions}
        setNumberOfOptions={setNumberOfOptions}
        handleChange={handleChange}
        handleRemove={handleRemove}
        correctAnswer={correctAnswer}
        setCorrectAnswer={setCorrectAnswer}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Make;
