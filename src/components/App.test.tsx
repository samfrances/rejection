import React from "react";
import { render, fireEvent } from "@testing-library/react";

import App from "./App";
import { AskStatus } from "../common/ask";
import { TestIDs } from "./constants";

function setup() {
  const { getByTestId, container, getByText } = render(<App />);

  const titleElement = () => getByTestId(TestIDs.Title);
  const newAskForm = () => container.querySelector(`form[data-testid="${TestIDs.NewAskForm}"]`);
  const asksList = () => getByTestId(TestIDs.AsksList);
  const questionInput = () => getByTestId(TestIDs.QuestionInput);
  const askeeInput = () => getByTestId(TestIDs.AskeeInput);
  const submitAskInput = () => getByTestId(TestIDs.AskSubmit);
  const scoreElement = () => getByTestId(TestIDs.Score);
  const score = () => scoreElement()!.querySelector(".score")!.textContent;

  const getAskByQuestionText = (text: string) =>
    getByText(text).parentElement!;
  const acceptAskByQuestionText = (text: string) => {
    const ask = getAskByQuestionText(text);
    fireEvent.click(ask.querySelector("button.accept")!);
  };

  const rejectAskByQuestionText = (text: string) => {
    const ask = getAskByQuestionText(text);
    fireEvent.click(ask.querySelector("button.reject")!);
  };

  const getAskStatusByQuestionText = (text: string) => {
    const askStatus = getAskByQuestionText(text).querySelector(".ask-status")!;
    const classList = [...askStatus.classList];
    if (
      classList.includes(AskStatus.Accepted)
      || classList.includes(AskStatus.Rejected)
    ) {
      return askStatus.textContent;
    }

    if (classList.includes(AskStatus.Unanswered)) {
      return AskStatus.Unanswered;
    }
  };

  const submitAsk = (question: string, askee: string) => {
    fireEvent.change(questionInput(), { target: { value: question }});
    fireEvent.change(askeeInput(), { target: { value: askee }});
    fireEvent.click(submitAskInput());
  };


  return {
    getByText,

    titleElement,
    newAskForm,
    asksList,
    scoreElement,
    score,
    acceptAskByQuestionText,
    rejectAskByQuestionText,
    getAskStatusByQuestionText,
    submitAsk,
  };
}

afterEach(() => localStorage.clear());

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

  const { submitAsk, getByText } = setup();

  const ask = "Can I have a cat?";
  const askee = "Landlord";

  submitAsk(ask, askee);

  const renderedAsk = getByText(ask);
  expect(renderedAsk).toBeInTheDocument();

});

test("renders adding multiple asks", () => {

  const { submitAsk, getByText } = setup();

  const askOne = "Can I have a cat?";
  const askeeOne = "Landlord";

  submitAsk(askOne, askeeOne);

  const askTwo = "Can we go to the zoo?";
  const askeeTwo = "Bob";

  submitAsk(askTwo, askeeTwo);

  expect(getByText(askOne)).toBeInTheDocument();
  expect(getByText(askTwo)).toBeInTheDocument();

});

test("renders correctly after accepting and rejecting", () => {

  const {
    submitAsk, rejectAskByQuestionText, acceptAskByQuestionText,
    getAskStatusByQuestionText,
  } = setup();

  const askOne = "Can I have a cat?";
  const askeeOne = "Landlord";

  submitAsk(askOne, askeeOne);

  const askTwo = "Can we go to the zoo?";
  const askeeTwo = "Bob";

  submitAsk(askTwo, askeeTwo);

  // Reject the first ask
  rejectAskByQuestionText(askOne);

  // Check result
  expect(getAskStatusByQuestionText(askOne))
    .toBe(AskStatus.Rejected);
  expect(getAskStatusByQuestionText(askTwo))
    .toContain(AskStatus.Unanswered);

  // Accept the second ask
  acceptAskByQuestionText(askTwo);

  // Check the results
  expect(getAskStatusByQuestionText(askTwo))
    .toBe(AskStatus.Accepted);
  expect(getAskStatusByQuestionText(askOne))
    .toBe(AskStatus.Rejected);

});

describe("renders the score", () => {

  test("to start with", () => {
    const { scoreElement } = setup();
    expect(scoreElement().textContent).toEqual("Score: 0");
  });

  test("after adding and accepting/rejecting asks", () => {

    const {
      submitAsk, acceptAskByQuestionText, rejectAskByQuestionText,
      score: scoreInDom
    } = setup();

    // Submit first ask
    const askOne = "Can I have a cat?";
    submitAsk(askOne, "Landlord");

    expect(scoreInDom()).toEqual("0");

    // Submit second ask
    const askTwo = "Can we go to the zoo?";
    submitAsk(askTwo, "Bob");

    expect(scoreInDom()).toEqual("0");

    // Accept ask two
    acceptAskByQuestionText(askTwo);

    expect(scoreInDom()).toEqual("1");

    // Submit a third ask
    const askThree = "Can I leave work early today?";
    submitAsk(askThree, "Boss");

    expect(scoreInDom()).toEqual("1");

    // Reject ask askThree
    rejectAskByQuestionText(askThree);

    expect(scoreInDom()).toEqual("11");

    // Reject askOne
    rejectAskByQuestionText(askOne);

    expect(scoreInDom()).toEqual("21");

  });

});
