import React, { useState } from "react";

import { Button, Input, Typography } from "@bigbinary/neetoui/v2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          value={password}
          onChange={e => setPassword(e.target.value)}
          required={true}
          placeholder="******"
          className="mb-5 w-1/3"
        />
        <Button style="primary" size="large" label="Submit" />
      </form>
    </div>
  );
};

export default Login;
