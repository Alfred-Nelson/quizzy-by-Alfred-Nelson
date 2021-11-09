import React from "react";

import { Button, Typography } from "@bigbinary/neetoui/v2";

import { AuthApi } from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import { setToLocalStorage, getFromLocalStorage } from "helpers/storage";

const NavItems = () => {
  const userFirstName = getFromLocalStorage("authUserFirstName");
  const userLastName = getFromLocalStorage("authUserLastName");
  const userName = `${userFirstName} ${userLastName}`;

  const handleClick = async () => {
    try {
      await AuthApi.destroy();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userFirstName: null,
        userLastName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Typography className="mr-5"> Reports </Typography>
      <Typography className="mr-5">{userName}</Typography>
      <Button label="Logout" onClick={handleClick} className="mr-5" />
    </div>
  );
};

export default NavItems;
