import React from "react";
import { render, fireEvent } from "@testing-library/react";

import App from "./App";
import { AskStatus } from "../common/types";
import { TestIDs } from "./constants";

function setup() {
  const { getByTestId, container, getByText } = render(<App />);

  const titleElement = () => getByTestId(TestIDs.Title);
  const newAskForm = () => container.querySelector(`form[data-testid="${TestIDs.NewAskForm}"]`);
  const asksList = () => getByTestId(TestIDs.AsksList);
  const questionInput = () => getByTestId(TestIDs.QuestionInput);
  const askeeInput = () => getByTestId(TestIDs.AskeeInput);
  const submitAskInput = () => getByTestId(TestIDs.AskSubmit);

  return {
    getByText,

    titleElement,
    newAskForm,
    asksList,
    questionInput,
    askeeInput,
    submitAskInput,
  };
}

test("renders rejection app header", () => {
  const { titleElement } = setup();

  expect(titleElement()).toBeInTheDocument();
  expect(titleElement().textContent!.toLowerCase()).toEqual("rejection app");
});

test("renders a form for adding new asks", () => {
  const { newAskForm: formElement } = setup();
  expect(formElement()).toBeInTheDocument();
});

test("renders the component containing a list of asks", () => {
  const { asksList } = setup();
  expect(asksList()).toBeInTheDocument();
});

test("renders adding an ask", () => {

  const {
    questionInput, askeeInput, submitAskInput: submitInput, getByText
  } = setup();

  const ask = "Can I have a cat?";
  const askee = "Landlord";

  fireEvent.change(questionInput(), { target: { value: ask }});
  fireEvent.change(askeeInput(), { target: { value: askee }});
  fireEvent.click(submitInput());

  const renderedAsk = getByText(ask);
  expect(renderedAsk).toBeInTheDocument();

});

test("renders adding multiple asks", () => {

  const {
    questionInput, askeeInput, submitAskInput: submitInput, getByText
  } = setup();

  const askOne = "Can I have a cat?";
  const askeeOne = "Landlord";

  fireEvent.change(questionInput(), { target: { value: askOne }});
  fireEvent.change(askeeInput(), { target: { value: askeeOne }});
  fireEvent.click(submitInput());

  const askTwo = "Can we go to the zoo?";
  const askeeTwo = "Bob";

  fireEvent.change(questionInput(), { target: { value: askTwo }});
  fireEvent.change(askeeInput(), { target: { value: askeeTwo }});
  fireEvent.click(submitInput());

  expect(getByText(askOne)).toBeInTheDocument();
  expect(getByText(askTwo)).toBeInTheDocument();

});

test("renders correctly after accepting and rejecting", () => {

  const {
    questionInput, askeeInput, submitAskInput: submitInput, getByText
  } = setup();

  const askOne = "Can I have a cat?";
  const askeeOne = "Landlord";

  fireEvent.change(questionInput(), { target: { value: askOne }});
  fireEvent.change(askeeInput(), { target: { value: askeeOne }});
  fireEvent.click(submitInput());

  const askTwo = "Can we go to the zoo?";
  const askeeTwo = "Bob";

  fireEvent.change(questionInput(), { target: { value: askTwo }});
  fireEvent.change(askeeInput(), { target: { value: askeeTwo }});
  fireEvent.click(submitInput());

  const renderedAskOne = getByText(askOne).parentElement!;
  const renderedAskTwo = getByText(askTwo).parentElement!;

  // Reject the first ask
  fireEvent.click(renderedAskOne.querySelector("button.reject")!);

  // Check result
  expect(renderedAskOne.querySelector(".ask-status")!.textContent)
    .toBe(AskStatus.Rejected);
  expect(renderedAskTwo.querySelector(".ask-status")!.classList)
    .toContain(AskStatus.Unanswered);

  // Accept the second ask
  fireEvent.click(renderedAskTwo.querySelector("button.accept")!);

  // Check the results
  expect(renderedAskTwo.querySelector(".ask-status")!.textContent)
    .toBe(AskStatus.Accepted);
  expect(renderedAskOne.querySelector(".ask-status")!.textContent)
    .toBe(AskStatus.Rejected);

});