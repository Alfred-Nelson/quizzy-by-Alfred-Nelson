import React from "react";

import { Header } from "@bigbinary/neetoui/v2/layouts";
import { Typography } from "antd";
import { Link } from "react-router-dom";

import NavItems from "./NavItems";

const Container = ({ children, isLoggedIn }) => {
  return (
    <div className="mx-4">
      <Header
        title={
          <Link to="/">
            <Typography type="h2">Quizzy</Typography>
          </Link>
        }
        actionBlock={isLoggedIn ? <NavItems /> : null}
        className="border-b-2"
      />
      <div className="mx-20 my-10 box-content">{children}</div>
    </div>
  );
};

export default Container;
