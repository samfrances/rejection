import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders rejection app header", () => {
  const { getByTestId } = render(<App />);
  const titleElement = getByTestId("title");
  expect(titleElement).toBeInTheDocument();
  expect(titleElement.textContent.toLowerCase()).toEqual("rejection app")
});

test("renders a form for adding new asks", () => {
  const { container } = render(<App />);
  const formElement = container.querySelector(`form[data-testid="new-ask-form"]`)
  expect(formElement).toBeInTheDocument();
})

test("renders the component containing a list of asks", () => {
  const { getByTestId } = render(<App />);
  const titleElement = getByTestId("asks-list");
  expect(titleElement).toBeInTheDocument();
});