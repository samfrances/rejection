import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewAskForm from "./NewAskForm";

test("renders an input for the ask question", () => {
  const { getByTestId } = render(<NewAskForm />);
  const inputElement = getByTestId("question-input");
  expect(inputElement).toBeInTheDocument();
  expect(inputElement.getAttribute("type")).toEqual("text");
  expect(inputElement.getAttribute("placeholder"))
    .toEqual("What do you want to ask for?");
});

test("renders an input for the askee", () => {
  const { getByTestId } = render(<NewAskForm />);
  const inputElement = getByTestId("askee-input");
  expect(inputElement).toBeInTheDocument();
  expect(inputElement.getAttribute("type")).toEqual("text");
  expect(inputElement.getAttribute("placeholder"))
    .toEqual("Who are you asking?");
});

test("renders submit button", () => {
  const { getByTestId } = render(<NewAskForm />);
  const inputElement = getByTestId("ask-submit");
  expect(inputElement).toBeInTheDocument();
  expect(inputElement.getAttribute("type")).toEqual("submit");
  expect(inputElement.getAttribute("value")).toEqual("Ask!");
});

test("empties the text inputs after submitting", async () => {
  const { getByTestId } = render(<NewAskForm />);
  const questionInput = getByTestId("question-input");
  const askeeInput = getByTestId("askee-input");
  const submitInput = getByTestId("ask-submit");

  fireEvent.change(questionInput, { target: { value: "Hello"}});
  fireEvent.change(askeeInput, { target: { value: "Bob"}});

  fireEvent.click(submitInput);

  expect((questionInput as HTMLInputElement).value).toEqual("");
  expect((askeeInput as HTMLInputElement).value).toEqual("");
});
