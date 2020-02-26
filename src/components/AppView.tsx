import React from 'react';
import '../css/normalize.css';
import '../css/skeleton.css';
import "../css/AppView.css";

import { TestIDs } from "./constants";

import NewAskForm from "./NewAskForm";
import AsksList from "./AsksList";
import Score from "./Score";

type Ask = import("../common/ask").Ask;

interface Props {
  asks: Ask[];
  onSubmitAsk: (question: string, askee: string) => void;
  accept: (askId: string) => void;
  reject: (askId: string) => void;
  score: number;
}

export default function AppView({
  onSubmitAsk,
  accept,
  reject,
  asks,
  score,
}: Props) {

  return (
    <div className="App container">
      <header className="App-header row">
        <div className="twelve columns">
          <h1 data-testid={TestIDs.Title}>Rejection App</h1>
        </div>
      </header>
      <div className="row">
        <div className="twelve columns">
          <NewAskForm onSubmitAsk={onSubmitAsk} />
        </div>
      </div>
      <div className="row">
        <div className="twelve columns">
          <Score score={score} />
        </div>
      </div>
      <div className="row">
        <div className="twelve columns">
          <AsksList asks={asks} reject={reject} accept={accept} />
        </div>
      </div>
    </div>
  );
}

