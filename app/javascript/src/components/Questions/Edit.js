import { TOASTR_OPTIONS } from "constants";

import React, { useEffect, useState } from "react";

import { useParams, useHistory } from "react-router";
import { toast } from "react-toastify";

import { QuestionApi } from "apis/question";
import PageHeader from "Common/utils/PageHeader";
import Question from "components/Form/Question";

const Edit = () => {
  const [quizName, setQuizName] = useState("");
  const [questionValue, setQuestionValue] = useState("");
  const [optionArray, setOptionArray] = useState([]);
  const [numberOfOptions, setNumberOfOptions] = useState(null);
  const [idArray, setIdArray] = useState([]);
  const [answer, setAnswer] = useState({});
  const [mainOptions, setMainOptions] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  const fetchAndSetDetails = async () => {
    const response = await QuestionApi.show(id);
    const data = await response.data.question;
    const name = data.quiz[0].toUpperCase() + data.quiz.slice(1);
    setQuizName(name);
    setQuestionValue(data.value);
    setQuizId(data.quiz_id);
    let options = data.options.map(option => option.value);
    setOptionArray([...options]);
    setMainOptions([...data.options]);
    setNumberOfOptions(options.length);
    const ids = data.options.map(option => option.id);
    setIdArray(ids);
    const result = data.options.filter(option => option.answer);
    const answerObject = {
      label: `option ${data.options.indexOf(result[0]) + 1}`,
      value: data.options.indexOf(result[0]),
    };
    setAnswer({ ...answerObject });
  };

  const handleChange = (e, index) => {
    const data = optionArray;
    data[index] = e.target.value.trim();
    setOptionArray([...data]);
  };

  const handleRemove = (e, index) => {
    const data = optionArray;
    data.splice(index, 1);
    setOptionArray([...data]);
    const ids = idArray;
    ids.splice(index, 1);
    setIdArray([...idArray]);
    setNumberOfOptions(prev => prev - 1);
    if (answer?.value === index) {
      setAnswer(null);
    } else if (answer?.value > index) {
      setAnswer({
        label: `option ${answer.value}`,
        value: answer.value - 1,
      });
    }
  };

  const callUpdateApi = async resultOption => {
    const payload = {
      question: { value: questionValue, options_attributes: resultOption },
    };
    await QuestionApi.update(id, payload);
    history.push(`/quiz/${quizId}/show`);
  };

  const handleSubmit = () => {
    if (optionArray.length !== numberOfOptions || optionArray.includes("")) {
      toast.error("Options cannot be blank", TOASTR_OPTIONS);
    } else if (!answer) {
      toast.error("Select a Correct answer", TOASTR_OPTIONS);
    } else if (questionValue == "") {
      toast.error("Question can't be blank", TOASTR_OPTIONS);
    } else {
      const resultOption = [];
      mainOptions.forEach(optionObject => {
        if (idArray.includes(optionObject.id)) {
          resultOption.push({
            ...optionObject,
            answer: answer.value === idArray.indexOf(optionObject.id),
            value: optionArray[idArray.indexOf(optionObject.id)],
          });
        } else {
          resultOption.push({ ...optionObject, _destroy: "1", answer: false });
        }
      });
      optionArray.slice(idArray.length).forEach((newOption, index) => {
        resultOption.push({
          answer: answer.value === idArray.length + index,
          value: newOption,
        });
      });
      callUpdateApi(resultOption);
    }
  };

  useEffect(() => {
    fetchAndSetDetails();
  }, []);

  return (
    <div>
      <PageHeader heading={`${quizName} Quiz`} />

      <Question
        array={Array(numberOfOptions).fill()}
        textareaValue={questionValue}
        setTextareaValue={setQuestionValue}
        optionsObject={optionArray}
        numberOfOptions={numberOfOptions}
        setNumberOfOptions={setNumberOfOptions}
        handleChange={handleChange}
        handleRemove={handleRemove}
        correctAnswer={answer}
        setCorrectAnswer={setAnswer}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Edit;
