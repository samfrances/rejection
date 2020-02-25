import React, { useState } from 'react';

export default function NewAskForm() {
  const [question, setQuestion] = useState("");
  const [askee, setAskee] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuestion("");
    setAskee("");
  };

  return (
    <form
      data-testid="new-ask-form"
      className="new-ask-form"
      onSubmit={onSubmit}>

      <input
        type="text"
        placeholder="What do you want to ask for?"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        data-testid="question-input" />
      <input
        type="text"
        placeholder="Who are you asking?"
        value={askee}
        onChange={e => setAskee(e.target.value)}
        data-testid="askee-input"/>
      <input
        type="submit"
        value="Ask!"
        data-testid="ask-submit" />

    </form>
  );
}