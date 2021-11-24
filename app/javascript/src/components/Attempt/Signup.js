import { TOASTR_OPTIONS } from "constants";

import React, { useState } from "react";

import { Button, Input, Typography } from "@bigbinary/neetoui/v2";
import { toast } from "react-toastify";

import { UserApi } from "apis/user";

const Signup = ({
  quizName,
  setLoggedIn,
  quizId,
  setAttemptId,
  setSubmitted,
}) => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = async () => {
    if (!emailInput) {
      toast.error(" Email cannot be blank", TOASTR_OPTIONS);
    } else if (!firstNameInput) {
      toast.error(" FirstName cannot be blank", TOASTR_OPTIONS);
    } else if (!lastNameInput) {
      toast.error(" LastName cannot be blank", TOASTR_OPTIONS);
    } else {
      const payload = {
        first_name: firstNameInput,
        last_name: lastNameInput,
        email: emailInput,
        attempts_attributes: [{ quiz_id: quizId, submitted: false }],
      };
      const response = await UserApi.create(payload);
      setLoggedIn(true);
      setAttemptId(response.data.id);
      setSubmitted(response.data.submitted);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 justify-center">
      <form className="flex flex-col items-center w-screen mb-40">
        <Typography style="h1" className="mb-10">
          Welcome To {quizName} quiz
        </Typography>
        <Input
          label="First Name"
          value={firstNameInput}
          onChange={e => setFirstNameInput(e.target.value)}
          required
          className="mb-5 w-1/3"
        />
        <Input
          label="Lastname"
          value={lastNameInput}
          onChange={e => setLastNameInput(e.target.value)}
          required
          className="mb-5 w-1/3"
        />
        <Input
          label="Email"
          required={true}
          value={emailInput}
          onChange={e => setEmailInput(e.target.value)}
          className="mb-5 w-1/3"
        />
        <Button
          style="primary"
          size="large"
          label="Submit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default Signup;
