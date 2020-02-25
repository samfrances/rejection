import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewAskForm from "./NewAskForm";

function setup() {
  const onSubmitAsk = jest.fn();
  const { getByTestId } = render(<NewAskForm onSubmitAsk={onSubmitAsk} />);
  const questionInput = () => getByTestId("question-input");
  const askeeInput = () => getByTestId("askee-input");
  const submitInput = () => getByTestId("ask-submit");
  const questionError = () => getByTestId("question-error");
  const askeeError = () => getByTestId("askee-error");

  return {
    questionInput,
    askeeInput,
    submitInput,
    onSubmitAsk,
    questionError,
    askeeError,
  };
}

test("renders an input for the ask question", () => {

  const { questionInput: inputElement } = setup();

  expect(inputElement()).toBeInTheDocument();
  expect(inputElement().getAttribute("type")).toEqual("text");
  expect(inputElement().getAttribute("placeholder"))
    .toEqual("What do you want to ask for?");
});

test("renders an input for the askee", () => {

  const { askeeInput: inputElement } = setup();

  expect(inputElement()).toBeInTheDocument();
  expect(inputElement().getAttribute("type")).toEqual("text");
  expect(inputElement().getAttribute("placeholder"))
    .toEqual("Who are you asking?");
});

test("renders submit button", () => {

  const { submitInput: inputElement } = setup();

  expect(inputElement()).toBeInTheDocument();
  expect(inputElement().getAttribute("type")).toEqual("submit");
  expect(inputElement().getAttribute("value")).toEqual("Ask!");
});

test("empties the text inputs after submitting", async () => {

  const { questionInput, askeeInput, submitInput } = setup();

  fireEvent.change(questionInput(), { target: { value: "Hello"}});
  fireEvent.change(askeeInput(), { target: { value: "Bob"}});

  fireEvent.click(submitInput());

  expect((questionInput() as HTMLInputElement).value).toEqual("");
  expect((askeeInput() as HTMLInputElement).value).toEqual("");
});

test("calls onSubmitAsk callback when form submitted", async () => {

  const { questionInput, askeeInput, submitInput, onSubmitAsk } = setup();

  const ask = "Hello";
  const askee = "Bob";

  fireEvent.change(questionInput(), { target: { value: ask }});
  fireEvent.change(askeeInput(), { target: { value: askee }});

  fireEvent.click(submitInput());

  expect(onSubmitAsk).toHaveBeenCalledWith(ask, askee);

});

test("validates question", async () => {

  const {
    questionInput, askeeInput, submitInput, onSubmitAsk,
    questionError
  } = setup();

  const ask = "Hi";
  const askee = "Bob";

  fireEvent.change(questionInput(), { target: { value: ask }});
  fireEvent.change(askeeInput(), { target: { value: askee }});

  fireEvent.click(submitInput());

  expect(onSubmitAsk).not.toHaveBeenCalledWith(ask, askee);

  expect(questionError()).toBeInTheDocument();

});

test("validates question", async () => {

  const {
    questionInput, askeeInput, submitInput, onSubmitAsk,
    askeeError
  } = setup();

  const ask = "Hello";
  const askee = "Bo";

  fireEvent.change(questionInput(), { target: { value: ask }});
  fireEvent.change(askeeInput(), { target: { value: askee }});

  fireEvent.click(submitInput());

  expect(onSubmitAsk).not.toHaveBeenCalledWith(ask, askee);

  expect(askeeError()).toBeInTheDocument();

});