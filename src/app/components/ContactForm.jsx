"use client";
import "./ContactForm.css";
import { useState } from "react";
import PropTypes from "prop-types";

import React from "react";

export default function ContactForm({contactFormTitle="Form"}) {
  const contactFormSubmit = (e) => {
    e.preventDefault();
  };

  const [inputText, setInputText] = useState({
    fNameInput: "",
    lNameInput: "",
    emailInput: "",
    phoneInput: "",
    countryInput: "",
    descInput: "",
  });

  const contactFormInputChange = (e) => {
    const { id, value } = e.target;
    setInputText((inputText) => ({
      ...inputText,
      [id]: value,
    }));
  };

  return (
    <form className="contact-form" id="contactForm">
      <h2 className="contact-form-title">{contactFormTitle}</h2>
      <fieldset className="formGroup">
        <div className="inputContainer">
          <input
            id="fNameInput"
            type="text"
            onChange={contactFormInputChange}
            value={inputText.fNameInput}
            placeholder="Enter First Name"
          />
          <label
            htmlFor="fNameInput"
            className={inputText.fNameInput !== "" ? "label-active" : ""}
          >
            First Name
          </label>
        </div>
        <div className="inputContainer">
          <input
            id="lNameInput"
            type="text"
            placeholder="Enter Last Name"
            onChange={contactFormInputChange}
            value={inputText.lNameInput}
          />
          <label
            htmlFor="lNameInput"
            className={inputText.lNameInput !== "" ? "label-active" : ""}
          >
            Last Name
          </label>
        </div>
      </fieldset>
      <fieldset className="formGroup">
        <div className="inputContainer">
          <input
            id="emailInput"
            type="email"
            placeholder="Enter Email"
            onChange={contactFormInputChange}
            value={inputText.emailInput}
          />
          <label
            htmlFor="emailInput"
            className={inputText.emailInput !== "" ? "label-active" : ""}
          >
            Email
          </label>
        </div>
        <div className="inputContainer">
          <input
            id="phoneInput"
            type="tel"
            placeholder="Enter Phone Number"
            onChange={contactFormInputChange}
            value={inputText.phoneInput}
          />
          <label
            htmlFor="phoneInput"
            className={inputText.phoneInput !== "" ? "label-active" : ""}
          >
            Phone
          </label>
        </div>
      </fieldset>
      <div className="inputContainer">
        <input
          id="countryInput"
          type="text"
          placeholder="Enter Country"
          onChange={contactFormInputChange}
          value={inputText.countryInput}
        />
        <label
          htmlFor="countryInput"
          className={inputText.countryInput !== "" ? "label-active" : ""}
        >
          Country
        </label>
      </div>
      <div className="inputContainer">
        <textarea
          id="descInput"
          className="textAreaContact"
          placeholder="Enter Description"
          onChange={contactFormInputChange}
          value={inputText.descInput}
        ></textarea>
        <label
          htmlFor="descInput"
          className={inputText.descInput !== "" ? "label-active" : ""}
        >
          Description
        </label>
      </div>
      <button className="btn" type="submit" onClick={contactFormSubmit}>
        Submit
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  contactFormTitle: PropTypes.string.isRequired,
};
