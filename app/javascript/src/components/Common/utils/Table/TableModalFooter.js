import React from "react";

import { Button } from "@bigbinary/neetoui/v2";

import { QuizApi } from "apis/quiz";

const TableModalFooter = ({
  editValue,
  editId,
  setEditValue,
  setEditId,
  setShowModal,
  fetchDetails,
}) => {
  const setToBack = () => {
    fetchDetails();
    setEditValue("");
    setEditId(null);
    setShowModal(false);
  };

  const handleSubmit = async () => {
    await QuizApi.update({
      id: editId,
      payload: { quiz: { name: editValue } },
    });
    setToBack();
  };

  return (
    <div>
      <input
        type="submit"
        className="rounded p-2 bg-gradient-to-b from-yellow-300 to-yellow-500 hover:bg-gradient-to-b hover:from-yellow-200 hover:via-yellow-300 hover:to-yellow-500"
        onClick={handleSubmit}
      />
      <Button
        style="secondary"
        label="Cancel"
        className="ml-5"
        onClick={setToBack}
      />
    </div>
  );
};

export default TableModalFooter;
