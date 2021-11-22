import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Typography, Button, PageLoader } from "@bigbinary/neetoui/v2";
import axios from "axios";

import { QuizApi } from "apis/quiz";
import PageHeader from "Common/utils/PageHeader";
import Table from "components/Dashboard/Table";
import { REPORT_COLUMN } from "constants/column";
import { getFromLocalStorage } from "helpers/storage.js";

const Report = () => {
  const [allReports, setAllReports] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [download, setDownload] = useState(false);
  const [userId, setUserId] = useState(null);
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(false);

  const token = getFromLocalStorage("authToken");
  const email = getFromLocalStorage("authEmail");

  const fetchDetails = async () => {
    setLoading(true);
    const response = await QuizApi.list();
    const data = await response.data;
    let necessaryData = [];
    data.quiz.forEach(quiz => {
      quiz.report.forEach(attempt => {
        if (attempt) {
          necessaryData.push({
            user_name: attempt.user_name,
            email: attempt.email,
            correct_answer_count: attempt.correct_answer_count,
            incorrect_answer_count: attempt.incorrect_answer_count,
            quiz_name: quiz.name,
          });
        }
      });
    });
    setAllReports(necessaryData);
    setLoading(false);
  };

  const handleSubmit = async () => {
    const response = await QuizApi.generateReport();
    const jobId = response.data.id;
    setUserId(response.data.user_id);
    setGenerating(true);
    const interval = setInterval(async () => {
      const res = await QuizApi.reportStatus(jobId);
      setTime(res.data.status.pct_complete);
      if (
        res.data.status.status === "complete" ||
        res.data.status.pct_complete == 100
      ) {
        setTimeout(() => {
          setDownload(true);
          clearInterval(interval);
        }, 1000);
      }
    }, 1000);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          {generating ? (
            <div className="flex justify-center mt-56">
              {download ? (
                <div className="flex flex-col items-center">
                  <Typography style="h3">
                    Click download to download the file
                  </Typography>
                  <Button
                    label="Download"
                    size="large"
                    onClick={async () => {
                      const resp = await axios.get("/download_report", {
                        headers: {
                          "X-Auth-Email": email,
                          "X-Auth-Token": token,
                        },
                      });
                      const temp = window.URL.createObjectURL(
                        new Blob([resp.data])
                      );
                      const link = document.createElement("a");
                      link.href = temp;
                      link.setAttribute("download", `report_${userId}.csv`);
                      document.body.appendChild(link);
                      link.click();
                    }}
                    className="mt-5"
                    icon={Download}
                  />
                </div>
              ) : (
                <div>
                  <Typography style="h3">
                    Waiting for generating file : {time}%{" "}
                  </Typography>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-100">
                      <div
                        style={{ width: time + "%" }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-400"
                      ></div>
                    </div>
                  </div>
                  <PageLoader />
                </div>
              )}
            </div>
          ) : (
            <div>
              <PageHeader
                heading="Report"
                buttonValue="Download"
                icon={Download}
                handleSubmit={handleSubmit}
              />
              {allReports.length <= 0 ? (
                <div className="flex h-64 md:mt-20 w-full justify-center items-center">
                  <Typography style="body1">
                    🐶 No one attempted your Quiz
                  </Typography>
                </div>
              ) : (
                <Table
                  allQuizzes={allReports}
                  fetchDetails={fetchDetails}
                  column={REPORT_COLUMN}
                  buttonShouldAppear={false}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Report;
