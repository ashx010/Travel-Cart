"use client";
import React from "react";
import style from "./Filter.module.css";
import TextField from "@mui/material/TextField";
import { LTR, font2 } from "@/app/fonts";
import { useState, useEffect, useRef } from "react";
import { ButtonStyle4 } from "@/components/all/styledButtons";
import Checkbox from "@mui/material/Checkbox";
import classNames from "classnames";
import RegisterForm from "@/components/login/RegisterForm";

export default function Filter({
  columns,
  handleCheckEvent,
  handleSelectRowsEvent,
  take,
  table_name,
  handleRefetch,
  setShowDelete,
  handleDeleteRecords,
  setSelectDelete,
  showDelete
}) {
  const [searchBox, setSearchBox] = useState("");
  const [selectRows, setSelectRows] = useState(take);

  //filter component refs
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const dropdownRef3 = useRef(null);
  const dropdownRef4 = useRef(null);
  const buttonRef1 = useRef(null);
  const buttonRef2 = useRef(null);
  const buttonRef3 = useRef(null);
  const buttonRef4 = useRef(null);
  const searchBoxRef = useRef(null);
  const selectRowsRef = useRef(null);

  const handleDropDown1 = (event) => {
    if (event.target.name === "selectColumns") {
      dropdownRef1.current.classList.toggle(style["active"]);
    }
    if (event.target.name === "selectRowsBtn") {
      dropdownRef2.current.classList.toggle(style["active"]);
    }
    if (event.target.name === "addNewBtn") {
      dropdownRef3.current.classList.toggle(style["active"]);
    }
    if (event.target.name === "delete") {
      dropdownRef4.current.classList.toggle(style["active"]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef1.current &&
        !dropdownRef1.current.contains(event.target) &&
        !buttonRef1.current.contains(event.target)
      ) {
        dropdownRef1.current.classList.remove(style["active"]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside2 = (event) => {
      if (
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target) &&
        !buttonRef2.current.contains(event.target)
      ) {
        dropdownRef2.current.classList.remove(style["active"]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside2);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside2);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef3.current &&
        !dropdownRef3.current.contains(event.target) &&
        !buttonRef3.current.contains(event.target)
      ) {
        dropdownRef3.current.classList.remove(style["active"]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={classNames(style["container"], LTR.className)}>
      <div className={style["search-box"]}>
        <TextField
          ref={searchBoxRef}
          id="search"
          label="Search"
          variant="standard"
          name="search"
          value={searchBox}
          onChange={(event) => {
            setSearchBox(event.target.value);
          }}
          fullWidth
        />
      </div>
      <div className={style["filter-box"]}>
        <ul className={style["filter-list"]}>
          <li className={style["filter-item"]}>
            <ButtonStyle4
              ref={buttonRef1}
              size="small"
              name="selectColumns"
              style={{ fontSize: "0.8em" }}
              onClick={handleDropDown1}
            >
              Select Columns
            </ButtonStyle4>
            <ul
              ref={dropdownRef1}
              id="columnsEditList"
              className={style["dropdownContainer"]}
            >
              {Object.entries(columns).map(([key, value], index) => {
                return (
                  <li key={index} className={style["dropdown-item"]}>
                    <Checkbox
                      checked={value}
                      onChange={handleCheckEvent}
                      name={key}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: "16px" } }}
                    />
                    <label
                      htmlFor={key}
                      className={classNames(
                        style["dropDownLabel"],
                        LTR.className
                      )}
                    >
                      {key.toUpperCase()}
                    </label>
                  </li>
                );
              })}
            </ul>
          </li>
          <li className={style["filter-item"]}>
            <ButtonStyle4
              ref={buttonRef2}
              name="selectRowsBtn"
              size="small"
              style={{ fontSize: "0.8em" }}
              onClick={handleDropDown1}
            >
              Select Rows
            </ButtonStyle4>
            <ul ref={dropdownRef2} className={style["dropdownContainer2"]}>
              <li className={style["dropdown-item2"]}>
                <TextField
                  ref={selectRowsRef}
                  id="selectRows"
                  label="Enter Enteries/Rows"
                  variant="standard"
                  name="selectRows"
                  type="number"
                  value={selectRows}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setSelectRows(e.target.value);
                  }}
                  fullWidth
                />
              </li>
              <li className={style["dropdown-item2"]}>
                <ButtonStyle4
                  size="small"
                  style={{ fontSize: "0.8em" }}
                  onClick={() => {
                    handleSelectRowsEvent();
                    dropdownRef2.current.classList.toggle(style["active"]);
                  }}
                >
                  Apply
                </ButtonStyle4>
              </li>
            </ul>
          </li>
          <li className={style["filter-item"]}>
            <ButtonStyle4
              ref={buttonRef3}
              size="small"
              style={{ fontSize: "0.8em" }}
              name="addNewBtn"
              onClick={handleDropDown1}
            >
              Add New
            </ButtonStyle4>
            <div ref={dropdownRef3} className={style["addnewContainer"]}>
              {table_name.table_name === "user" ? <RegisterForm needSwitch={false} customFormStyle={{width: "94%"}} /> : ""}
            </div>
          </li>
          <li className={style["filter-item"]}>
            <ButtonStyle4
              ref={buttonRef4}
              size="small"
              style={{ fontSize: "0.8em" }}
              name="delete"
              onClick={(e) => {
                handleDropDown1(e);
                setShowDelete(() => {
                  return !showDelete;
                });
              }}
            >
              Delete Record
            </ButtonStyle4>
            <ul ref={dropdownRef4} className={style["deleteRecordContainer"]}>
              {showDelete && <li className={style["dropdown-item2"]}>
                <ButtonStyle4
                  size="small"
                  style={{ fontSize: "0.8em" }}
                  onClick={() => {
                    setShowDelete(false);
                    setSelectDelete([]);
                    dropdownRef4.current.classList.toggle(style["active"]);
                  }}
                >
                  Cancel
                </ButtonStyle4>
              </li>}
              <li className={style["dropdown-item2"]}>
                <ButtonStyle4
                  size="small"
                  style={{ fontSize: "0.8em" }}
                  onClick={() => {
                    handleDeleteRecords();
                    dropdownRef4.current.classList.toggle(style["active"]);
                  }}
                >
                  Apply
                </ButtonStyle4>
              </li>
            </ul>
          </li>
          <li className={style["filter-item"]}>
            <ButtonStyle4
              size="small"
              style={{ fontSize: "0.8em" }}
              name="refresh"
              onClick={handleRefetch}
            >
              Refresh
            </ButtonStyle4>
          </li>
        </ul>
      </div>
    </div>
  );
}
