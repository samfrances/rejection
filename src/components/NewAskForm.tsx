import React from 'react';

export default function NewAskForm() {
  return (
    <form data-testid="new-ask-form" className="new-ask-form">
      <input
        type="text"
        placeholder="What do you want to ask for?"
        data-testid="question-input" />
      <input
        type="text"
        placeholder="Who are you asking?"
        data-testid="askee-input" />
      <input
        type="submit"
        value="Ask!"
        data-testid="ask-submit" />
    </form>
  );
}