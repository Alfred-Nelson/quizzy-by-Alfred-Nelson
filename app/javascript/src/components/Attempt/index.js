import React, { useState, useEffect } from "react";

import { useParams } from "react-router";

import { QuizApi } from "apis/quiz";
import Signup from "components/Attempt/Signup";
import Container from "components/Container";

import ShowQuiz from "./ShowQuiz";
import TakeQuiz from "./TakeQuiz";

const Attempt = () => {
  const [quizName, setQuizName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [quizId, setQuizId] = useState(null);
  const [attemptId, setAttemptId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { slug } = useParams();

  const fetchDetails = async () => {
    const response = await QuizApi.getQuizBySlug(slug);
    setQuizName(
      response.data.quiz.name[0].toUpperCase() +
        response.data.quiz.name.slice(1).toLowerCase()
    );
    setQuizId(response.data.quiz.id);
  };

  useEffect(() => {
    fetchDetails();
    return () => {};
  }, []);

  return (
    <Container>
      {!loggedIn ? (
        <Signup
          quizName={quizName}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setAttemptId={setAttemptId}
          setSubmitted={setSubmitted}
          quizId={quizId}
        />
      ) : !submitted ? (
        <TakeQuiz slug={slug} attemptId={attemptId} quizName={quizName} />
      ) : (
        <ShowQuiz quizId={quizId} attemptId={attemptId} quizName={quizName} />
      )}
    </Container>
  );
};

export default Attempt;
