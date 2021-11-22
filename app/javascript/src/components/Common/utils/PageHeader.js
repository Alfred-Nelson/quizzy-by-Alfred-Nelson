import React from "react";

import { Button, Typography } from "@bigbinary/neetoui/v2";
import { Link } from "react-router-dom";

const PageHeader = ({
  heading,
  buttonValue,
  linkTo,
  icon,
  handleSubmit = () => {},
}) => {
  return (
    <div className="flex w-full justify-between">
      <Typography style="h3">{heading}</Typography>
      {buttonValue && (
        <Link to={linkTo}>
          <Button
            size="large"
            label={buttonValue}
            icon={icon}
            iconPosition="left"
            onClick={handleSubmit}
          />
        </Link>
      )}
    </div>
  );
};

export default PageHeader;
