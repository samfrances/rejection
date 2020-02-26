import React, { useState } from 'react';

import "../css/NewAskForm.css";

import { TestIDs } from "./constants";

interface Props {
  onSubmitAsk: (question: string, askee: string) => void;
}

export default function NewAskForm({ onSubmitAsk }: Props) {
  const [question, setQuestion] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [askee, setAskee] = useState("");
  const [askeeError, setAskeeError] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onSubmitAsk(question, askee);
      setQuestion("");
      setAskee("");
    }
  };

  const validate = () => {

    const questionError =
      question.length < 3
        ? "Question must be at least 3 characters long"
        : "";

    const askeeError =
      askee.length < 3
        ? "Askee must be at least 3 characters long"
        : "";

    setQuestionError(questionError);
    setAskeeError(askeeError);

    return !(questionError || askeeError);
  };

  return (
    <form
      data-testid={TestIDs.NewAskForm}
      className="new-ask-form"
      onSubmit={onSubmit}>

      <input
        type="text"
        placeholder="What do you want to ask for?"
        value={question}
        onChange={e => { setQuestion(e.target.value); }}
        className="question-input"
        data-testid={TestIDs.QuestionInput} />
      <input
        type="text"
        placeholder="Who are you asking?"
        value={askee}
        onChange={e => { setAskee(e.target.value); }}
        className="askee-input"
        data-testid={TestIDs.AskeeInput} />
      <input
        type="submit"
        value="Ask!"
        data-testid={TestIDs.AskSubmit}
        className="button-primary" />
      <ul className="errors">
        {questionError ? <li data-testid={TestIDs.QuestionError}>{questionError}</li> : null}
        {askeeError ? <li data-testid={TestIDs.AskeeError}>{askeeError}</li> : null}
      </ul>
    </form>
  );
}