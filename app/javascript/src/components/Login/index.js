import React, { useState } from "react";

import { Button, Input, Typography } from "@bigbinary/neetoui/v2";

import { AuthApi } from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "helpers/storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  loading;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await AuthApi.create({ login: { email, password } });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email,
        userId: response.data.id,
        userName: response.data.name,
      });
      setAuthHeaders();
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen justify-center">
      <form className="flex flex-col items-center w-screen mb-40">
        <Typography style="h1" className="mb-10">
          Sign In
        </Typography>
        <Input
          label="Email"
          value={email}
          placeholder="sam@example.com"
          onChange={e => setEmail(e.target.value)}
          required={true}
          className="mb-5 w-1/3"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required={true}
          placeholder="******"
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

export default Login;
