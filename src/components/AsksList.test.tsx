import React from "react";
import  cuid from "cuid";
import { render, fireEvent } from "@testing-library/react";

import AsksList from "./AsksList";
import { Ask, AskStatus } from "../common/ask";
import { TestIDs } from "./constants";

const asks: Ask[] = [
  {
    question: "Can I have a cookie?",
    askee: "Mom",
    id: cuid(),
    timestamp: Date.now(),
    status: AskStatus.Rejected
  },
  {
    question: "Can I have a games console?",
    askee: "Dad",
    id: cuid(),
    timestamp: Date.now(),
    status: AskStatus.Accepted
  },
  {
    question: "Can I have a games raise?",
    askee: "Boss",
    id: cuid(),
    timestamp: Date.now(),
    status: AskStatus.Unanswered
  }
];

function setup(asksList: Ask[] = asks) {
  const accept = jest.fn();
  const reject = jest.fn();

  const { container, getByText, getByTestId } =
    render(<AsksList asks={asksList} reject={reject} accept={accept} />);

  const asksListHeader = () => container.querySelector(`thead[data-testid="${TestIDs.AsksListHeader}"]`);

  const renderedAsks = () => container.querySelectorAll(".ask");
  const renderedAsk = (askId: string) => getByTestId(`ask=${askId}`);
  const renderedAskee = (askId: string) => {
    const ask = renderedAsk(askId);
    return ask.querySelector(".ask-askee");
  };
  const renderedAskDate = (askId: string) => {
    const ask = renderedAsk(askId);
    return ask.querySelector(".ask-date");
  };
  const renderedAskStatus = (askId: string) => {
    const ask = renderedAsk(askId);
    return ask.querySelector(".ask-status");
  };
  const acceptButton = (askId: string) => {
    return renderedAskStatus(askId)!.querySelector("button.accept");
  };
  const rejectButton = (askId: string) => {
    return renderedAskStatus(askId)!.querySelector("button.reject");
  };

  return {
    accept,
    reject,

    asksListHeader,
    renderedAsks,
    renderedAskee,
    renderedAskDate,
    renderedAskStatus,
    acceptButton,
    rejectButton,

    getByText
  };
}

test("should not render the table header if there are no asks", () => {

  const { asksListHeader } = setup([]);
  expect(asksListHeader()).toBeNull();

});

test("should render the table header if there is at least one ask", () => {

  const { asksListHeader } = setup();
  expect(asksListHeader()).not.toBeNull();

});

test("table header should contain the expected headings", () => {

  const { asksListHeader } = setup();

  const headings =
    [ ...asksListHeader()!.querySelector("tr")!.children ]
    .map(el => el.textContent);

  expect(headings).toHaveLength(4);

  expect(headings[0]).toEqual("Question");
  expect(headings[1]).toEqual("Askee");
  expect(headings[2]).toEqual("Date");
  expect(headings[3]).toEqual("Status");
});

test("renders the right number of asks", () => {
  const { renderedAsks } = setup();
  expect(renderedAsks().length).toBe(asks.length);
});

describe("renders the expected question text", () => {

  for (const ask of asks) {
    test(ask.question, () => {
      const { getByText } = setup();
      const renderedAsk = getByText(ask.question);
      expect(renderedAsk).toBeInTheDocument();
    });
  }

});

describe("renders the expected askee", () => {

  for (const ask of asks) {
    test(ask.askee, () => {

      const { renderedAskee } = setup();

      expect(renderedAskee(ask.id)).not.toBeNull();
      expect(renderedAskee(ask.id)).toBeDefined();
      expect(renderedAskee(ask.id)).toBeInTheDocument();
      expect(renderedAskee(ask.id)!.textContent).toBe(ask.askee);
    });
  }

});

describe("renders the expected ask date", () => {

  for (const ask of asks) {
    test(ask.question, () => {

      const { renderedAskDate } = setup();

      expect(renderedAskDate(ask.id)).not.toBeNull();
      expect(renderedAskDate(ask.id)).toBeDefined();
      expect(renderedAskDate(ask.id)).toBeInTheDocument();
      expect(renderedAskDate(ask.id)!.textContent).toBe(new Date(ask.timestamp).toLocaleString());
    });
  }

});

describe("renders the ask status, if answered", () => {

  for (const ask of asks.filter(a => a.status !== AskStatus.Unanswered)) {
    test(ask.question, () => {

      const { renderedAskStatus } = setup();

      expect(renderedAskStatus(ask.id)).not.toBeNull();
      expect(renderedAskStatus(ask.id)).toBeDefined();
      expect(renderedAskStatus(ask.id)).toBeInTheDocument();
      expect(renderedAskStatus(ask.id)!.textContent).toBe(ask.status);
      // Should also have a class relevant to its status so it can be styled
      expect(renderedAskStatus(ask.id)!.classList).toContain(ask.status);
    });
  }

});

describe("renders buttons to set ask status, if not answered", () => {

  for (const ask of asks.filter(a => a.status === AskStatus.Unanswered)) {
    test(ask.question, () => {

      const { renderedAskStatus, acceptButton, rejectButton } = setup();

      // Should have a class relevant to its status so it can be styled
      expect(renderedAskStatus(ask.id)!.classList).toContain(ask.status);

      // Should render an an reject button
      expect(rejectButton(ask.id)).not.toBeNull();
      expect(rejectButton(ask.id)!.textContent).toBe("Reject");

      // Should render an an accept button
      expect(acceptButton(ask.id)).not.toBeNull();
      expect(acceptButton(ask.id)!.textContent).toBe("Accept");
    });
  }

});

describe("reject button should call reject callback", () => {
  for (const ask of asks.filter(a => a.status === AskStatus.Unanswered)) {
    test(ask.question, () => {

      const { rejectButton, reject: rejectCallback } = setup();

      // Should render an an reject button
      fireEvent.click(rejectButton(ask.id)!);

      expect(rejectCallback).toHaveBeenCalled();

    });
  }
});

describe("accept button should call accept callback", () => {
  for (const ask of asks.filter(a => a.status === AskStatus.Unanswered)) {
    test(ask.question, () => {

      const { acceptButton, accept: acceptCallback } = setup();

      // Should render an an reject button
      fireEvent.click(acceptButton(ask.id)!);

      expect(acceptCallback).toHaveBeenCalled();

    });
  }
});