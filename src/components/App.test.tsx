import React from "react";
import cuid from "cuid";
import { render, fireEvent, cleanup } from "@testing-library/react";

import App, { STORAGE_KEY } from "./App";
import { AskStatus } from "../common/ask";
import { TestIDs } from "./constants";

type Ask = import("../common/ask").Ask;

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

  const countRenderedAsks = () => {
    return asksList()!.querySelectorAll("tbody tr").length;
  }

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

  const getAskeeByQuestionText = (text: string) => {
    return (
      getAskByQuestionText(text)
        .querySelector(".ask-askee")!
        .textContent
    );
  }

  const getDateByQuestionText = (text: string) => {
    return (
      getAskByQuestionText(text)
        .querySelector(".ask-date")!
        .children[0]
    );
  }

  const submitAsk = (question: string, askee: string) => {
    fireEvent.change(questionInput(), { target: { value: question }});
    fireEvent.change(askeeInput(), { target: { value: askee }});
    fireEvent.click(submitAskInput());
  };

  const getLocalStorageData = () => {
    return localStorage.getItem(STORAGE_KEY)
  }

  return {
    getByText,

    titleElement,
    newAskForm,
    asksList,
    countRenderedAsks,
    scoreElement,
    score,

    acceptAskByQuestionText,
    rejectAskByQuestionText,
    submitAsk,

    getAskByQuestionText,
    getAskStatusByQuestionText,
    getAskeeByQuestionText,
    getDateByQuestionText,

    getLocalStorageData,
  };
}

beforeEach(() => {
  localStorage.clear();
})

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

test("stores state in localStorage", () => {

  function assertIsAsk(ask: any): asserts ask is Ask {
    expect(typeof ask.id).toBe("string");
    expect(typeof ask.timestamp).toBe("number");
    expect(typeof ask.question).toBe("string");
    expect(typeof ask.askee).toBe("string");
    expect(typeof ask.status).toBe("string");
    expect(Object.values(AskStatus)).toContain(ask.status);
  }

  const {
    submitAsk, acceptAskByQuestionText, rejectAskByQuestionText,
    getLocalStorageData,
  } = setup();

  {
    const data = getLocalStorageData();
    expect(data).not.toBeNull();
    if (data) {
      const asks: Ask[] = JSON.parse(data).asks;
      expect(asks).toHaveLength(0);
    }
  }

  // Submit first ask
  const askOne = "Can I have a cat?";
  const askeeOne = "Landlord";
  submitAsk(askOne, askeeOne);

  {
    const data = getLocalStorageData();
    expect(data).not.toBeNull();
    if (data) {
      const asks: Ask[] = JSON.parse(data).asks;
      expect(asks).toHaveLength(1);

      const [ ask ] = asks;
      assertIsAsk(ask);

      expect(ask.question).toBe(askOne);
      expect(ask.askee).toBe(askeeOne);
      expect(ask.status).toBe(AskStatus.Unanswered);
    }
  }

  // Submit second ask
  const askTwo = "Can we go to the zoo?";
  const askeeTwo = "Bob";
  submitAsk(askTwo, askeeTwo);

  {
    const data = getLocalStorageData();
    expect(data).not.toBeNull();
    if (data) {
      const asks: Ask[] = JSON.parse(data).asks;
      expect(asks).toHaveLength(2);

      const [ first, second ] = asks;

      assertIsAsk(first);
      expect(first.question).toBe(askOne);
      expect(first.askee).toBe(askeeOne);
      expect(first.status).toBe(AskStatus.Unanswered);

      assertIsAsk(second);
      expect(second.question).toBe(askTwo);
      expect(second.askee).toBe(askeeTwo);
      expect(second.status).toBe(AskStatus.Unanswered);
    }
  }

  // Accept ask two
  acceptAskByQuestionText(askTwo);

  {
    const data = getLocalStorageData();
    expect(data).not.toBeNull();
    if (data) {
      const asks: Ask[] = JSON.parse(data).asks;
      expect(asks).toHaveLength(2);

      const [ first, second ] = asks;

      assertIsAsk(first);
      expect(first.question).toBe(askOne);
      expect(first.askee).toBe(askeeOne);
      expect(first.status).toBe(AskStatus.Unanswered);

      assertIsAsk(second);
      expect(second.question).toBe(askTwo);
      expect(second.askee).toBe(askeeTwo);
      expect(second.status).toBe(AskStatus.Accepted);
    }
  }

  // Reject askOne
  rejectAskByQuestionText(askOne);

  {
    const data = getLocalStorageData();
    expect(data).not.toBeNull();
    if (data) {
      const asks: Ask[] = JSON.parse(data).asks;
      expect(asks).toHaveLength(2);

      const [ first, second ] = asks;

      assertIsAsk(first);
      expect(first.question).toBe(askOne);
      expect(first.askee).toBe(askeeOne);
      expect(first.status).toBe(AskStatus.Rejected);

      assertIsAsk(second);
      expect(second.question).toBe(askTwo);
      expect(second.askee).toBe(askeeTwo);
      expect(second.status).toBe(AskStatus.Accepted);
    }
  }

});

describe("Gets state from localstorage", () => {

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

  for (const ask of asks) {
    test(ask.question, () => {

      localStorage.setItem(STORAGE_KEY, JSON.stringify({ asks }));

      const {
        getAskByQuestionText,
        getAskStatusByQuestionText,
        countRenderedAsks,
        getAskeeByQuestionText,
        getDateByQuestionText,
      } = setup();

      expect(countRenderedAsks()).toEqual(3)

      // Check question rendered
      const renderedAsk = getAskByQuestionText(ask.question);
      expect(renderedAsk).toBeInTheDocument();

      // Check status correct
      expect(getAskStatusByQuestionText(ask.question)).toEqual(ask.status);

      // Check askee
      expect(getAskeeByQuestionText(ask.question)).toEqual(ask.askee);

      // Check date
      const dateElement = getDateByQuestionText(ask.question);
      expect(dateElement!.getAttribute("datetime"))
        .toEqual((new Date(ask.timestamp)).toString());

    });
  }

});
