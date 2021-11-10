import React, { useMemo, useState } from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { Button, Typography, Alert } from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router";
import { useTable } from "react-table";

import { QuizApi } from "apis/quiz";
import ModalCreate from "Common/ModalCreate";
import TableModalBody from "Common/utils/Table/TableModalBody";
import TableModalFooter from "Common/utils/Table/TableModalFooter";
import TableModalHeader from "Common/utils/Table/TableModalHeader";
import { COLUMN } from "constants/column";

const Table = ({ allQuizzes, fetchDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [deleteUser, setDeleteUser] = useState(null);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const history = useHistory();
  const columns = useMemo(() => COLUMN, []);
  const data = useMemo(() => allQuizzes, [allQuizzes]);

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="flex flex-wrap justify-center">
      <table
        className=" w-full md:w-3/4 border-2 border-black rounded-xl mt-20 flex flex-col items-center"
        {...getTableProps()}
      >
        <thead className="w-full flex justify-center rounded-t-xl py-1 bg-gradient-to-b from-yellow-300 to-yellow-500">
          {headerGroups.map((headerGroup, id) => (
            <tr key={id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, colId) => (
                <th key={colId} {...column.getHeaderProps()}>
                  {" "}
                  {column.render("Header")}{" "}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="w-full flex flex-col " {...getTableBodyProps()}>
          {rows.map((row, rowId) => {
            prepareRow(row);
            return (
              <tr
                key={rowId}
                className="px-10 py-2 w-full border-t-2 border-gray-300"
                {...row.getRowProps()}
              >
                {row.cells.map((cell, cellId) => (
                  <td
                    key={cellId}
                    className="flex flex-col items-center sm:flex-row sm:justify-between"
                    {...cell.getCellProps()}
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        history.push(`/quiz/${row.original.id}/show`)
                      }
                    >
                      <Typography>{cell.render("Cell")}</Typography>
                    </div>
                    <div>
                      <Button
                        style="secondary"
                        className=" mr-5"
                        icon={Edit}
                        onClick={() => {
                          setEditId(row.original.id);
                          setEditValue(row.original.name);
                          setShowModal(true);
                        }}
                      />
                      <Button
                        icon={Delete}
                        onClick={() => {
                          setAlertIsOpen(true);
                          setDeleteUser(row.original.id);
                        }}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <ModalCreate
        size="md"
        showModal={showModal}
        header={<TableModalHeader />}
        setShowModal={setShowModal}
        body={
          <TableModalBody editValue={editValue} setEditValue={setEditValue} />
        }
        footer={
          <TableModalFooter
            editValue={editValue}
            editId={editId}
            setEditId={setEditId}
            setEditValue={setEditValue}
            setShowModal={setShowModal}
            fetchDetails={fetchDetails}
          />
        }
      />
      <Alert
        closeButton
        isOpen={alertIsOpen}
        message="Are you sure you want to continue? All of your unsaved changes will be lost."
        onClose={() => {
          setAlertIsOpen(false);
          setDeleteUser(null);
        }}
        onSubmit={async () => {
          await QuizApi.kill(deleteUser);
          setAlertIsOpen(false);
          fetchDetails();
        }}
        title="You have unsaved changes!"
      />
    </div>
  );
};

export default Table;
