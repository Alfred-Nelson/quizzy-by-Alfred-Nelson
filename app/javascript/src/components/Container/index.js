import React from "react";

import { Header } from "@bigbinary/neetoui/v2/layouts";

import NavItems from "./NavItems";

const Container = ({ children, isLoggedIn }) => {
  return (
    <div className="mx-4">
      <Header
        title="Quizzy"
        actionBlock={isLoggedIn ? <NavItems /> : null}
        className="border-b-2"
      />
      <div className="mx-20 my-10 ">{children}</div>
    </div>
  );
};

export default Container;
