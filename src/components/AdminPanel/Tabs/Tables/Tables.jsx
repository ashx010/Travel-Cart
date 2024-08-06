"use client";
import React from "react";
import style from "./Tables.module.css";
import useSWR, { mutate } from "swr";
import { useState, useEffect } from "react";
import { LTR, font2 } from "@/app/fonts";
import classNames from "classnames";
import Image from "next/image";
import Pagination from "@mui/material/Pagination";
import Filter from "./Filter";
import Skeleton from "@mui/material/Skeleton";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";

export default function Tables(table_name = "user") {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(2);
  const [columnFilter, setColumnFilter] = useState({ selectAll: false });
  const [selectDelete, setSelectDelete] = useState([]);
  const [showDelete, setShowDelete] = useState(false);

  const fetcher = async (table_name, skip, take) => {
    const { handleAdminTableData } = await import("@/lib/action");
    return handleAdminTableData(table_name, skip, take);
  };

  const { data, error, isLoading } = useSWR(
    [table_name, skip, take],
    () => fetcher(table_name, skip, take),
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    setSkip((value - 1) * take);
  };

  const handleRefetch = () => {
    setPage(1);
    setSkip(0);
    setSelectDelete([]);
    setShowDelete(false);
    mutate([table_name, 0, take]);
  };

  useEffect(() => {
    if (data && data.count) {
      setPageCount(Math.ceil(data.count / take));
    }
  }, [data, take]);

  useEffect(() => {
    if (data && data.result) {
      Object.keys(data.result[0]).map((item) => {
        setColumnFilter((columnFilter) => {
          if (item === "password" || item === "id") {
            return {
              ...columnFilter,
              [item]: false,
            };
          }
          return {
            ...columnFilter,
            [item]: true,
          };
        });
      });
    }
  }, [data]);

  const handleColumnCheckFilter = (event) => {
    setColumnFilter((columnFilter) => {
      if (event.target.name === "selectAll") {
        return Object.keys(columnFilter).reduce((acc, key) => {
          acc[key] = event.target.checked;
          return acc;
        }, {});
      }
      return {
        ...columnFilter,
        ["selectAll"]: false,
        [event.target.name]: event.target.checked,
      };
    });
  };

  const handleSelectRows = () => {
    let value = document.getElementById("selectRows").value;
    setTake(parseInt(value));
    handlePageChange(null, 1);
  };

  const handleDeleteRecords = async() => {
    const { handleDeleteRecords } = require("@/lib/action");
    const result = await handleDeleteRecords(table_name, selectDelete);
    console.log(result);
    if (result.result === "success") {
      console.log("Deleted Successfully");
      handleRefetch();
    }
  };

  const handleSelectDeleteRecords = (event) => {
    let id = parseInt(event.target.name);
    if(selectDelete.includes(id)){
      let new_selectDelete = selectDelete.filter((x) => x !== id);
      setSelectDelete(new_selectDelete);
    }
    setSelectDelete((selectDelete) => {
      return [...selectDelete, id];
    });
  };

  return (
    <div className={style["ParentContainer"]}>
      <h1 className={classNames(style["TableTitle"], font2.className)}>
        {table_name.table_name}
      </h1>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          style={{ width: "100%", height: "60vh", borderRadius: "1em" }}
        />
      ) : error ? (
        <h1 className={classNames(style["TableResult"], LTR.className)}>
          Failed to load data!!
        </h1>
      ) : (
        <>
          {data && data.result && data.count && (
            <Filter
              columns={columnFilter}
              handleCheckEvent={handleColumnCheckFilter}
              handleSelectRowsEvent={handleSelectRows}
              take={take}
              table_name={table_name}
              handleRefetch={handleRefetch}
              setShowDelete={setShowDelete}
              handleDeleteRecords={handleDeleteRecords}
              setSelectDelete={setSelectDelete}
              showDelete={showDelete}
            />
          )}
          <div className={style["TableContainer"]}>
            {data.result === "empty" ? (
              <h1 className={classNames(style["TableResult"], LTR.className)}>
                No Data Available!!
              </h1>
            ) : data.result === "failed" ? (
              <h1 className={classNames(style["TableResult"], LTR.className)}>
                Failed to load data!!
              </h1>
            ) : (
              <>
                <table className={style["Table"]}>
                  <thead className={style["TableHeader"]}>
                    <tr>
                      {showDelete && (
                        <th className={style["TableHeaderItem"]}>Select</th>
                      )}
                      {Object.keys(data.result[0]).map(
                        (key) =>
                          columnFilter[key] && (
                            <th key={key} className={style["TableHeaderItem"]}>
                              {key}
                            </th>
                          )
                      )}
                    </tr>
                  </thead>
                  <tbody
                    className={classNames(style["TableBody"], LTR.className)}
                  >
                    {data.result.map((item, index) => (
                      <tr key={index} className={style["TableRow"]}>
                        {showDelete && (
                          <td
                            key={index + "_select"}
                            className={style["TableBodyItem"]}
                          >
                            <Checkbox
                              checked={selectDelete[index]}
                              onChange={handleSelectDeleteRecords}
                              name={item.id}
                              sx={{
                                "& .MuiSvgIcon-root": { fontSize: "16px" },
                              }}
                            />
                          </td>
                        )}
                        {Object.entries(item).map(
                          ([key, value], index) =>
                            columnFilter[key] && (
                              <td
                                key={index}
                                className={style["TableBodyItem"]}
                              >
                                {index === 1 ? (
                                  <Image
                                    src={value}
                                    alt="profile pic"
                                    width={70}
                                    height={70}
                                    style={{
                                      borderRadius: "50%",
                                      aspectRatio: 1,
                                    }}
                                  />
                                ) : typeof value === "object" ? (
                                  value.toDateString()
                                ) : value === true ? (
                                  <span
                                    style={{
                                      color: "#2a9d8f",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Active
                                  </span>
                                ) : value === false ? (
                                  <span style={{ color: "#ef476f" }}>
                                    Inactive
                                  </span>
                                ) : (
                                  value
                                )}
                              </td>
                            )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
          {data.result !== "empty" &&
            data.result !== "failed" &&
            Object.values(columnFilter).some((value) => value === true) && (
              <div className={style["TableFooter"]}>
                <Pagination
                  sx={{ color: "#A8DADC" }}
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </div>
            )}
        </>
      )}
    </div>
  );
}
