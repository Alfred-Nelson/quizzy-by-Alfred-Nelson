import React from "react";

import { Input } from "@bigbinary/neetoui/v2";

const TableModalBody = ({ editValue, setEditValue }) => {
  return (
    <div>
      <Input
        size="large"
        placeholder="Enter the Quiz name"
        value={editValue}
        onChange={e => setEditValue(e.target.value)}
      />
    </div>
  );
};

export default TableModalBody;
