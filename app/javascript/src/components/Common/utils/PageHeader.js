import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";
import { Link } from "react-router-dom";

const PageHeader = ({ heading, buttonValue, linkTo }) => {
  return (
    <div className="flex w-full justify-between">
      <Typography style="h3">{heading}</Typography>
      <Link to={linkTo}>
        <Button
          size="large"
          label={buttonValue}
          icon={Plus}
          iconPosition="left"
        />
      </Link>
    </div>
  );
};

export default PageHeader;
