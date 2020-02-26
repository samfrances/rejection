import React, { useReducer } from 'react';
import '../css/normalize.css';
import '../css/skeleton.css';
import "../css/App.css";

import reducer, { initialState, getAllAsks, score } from "../reducers";
import * as fromActions from "../actions";
import { TestIDs } from "./constants";

import NewAskForm from "./NewAskForm";
import AsksList from "./AsksList";
import Score from "./Score";

function App() {

  const [state, dispatch] = useReducer(reducer, initialState());

  const onSubmitAsk =
    (question: string, askee: string) => {
        dispatch(fromActions.createAsk({ question, askee }));
    };

  const reject =
    (id: string) => { dispatch(fromActions.rejectAsk({ id })); };

  const accept =
    (id: string) => { dispatch(fromActions.approveAsk({ id })); };

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
          <Score score={score(state)} />
        </div>
      </div>
      <div className="row">
        <div className="twelve columns">
          <AsksList asks={[...getAllAsks(state)]} reject={reject} accept={accept} />
        </div>
      </div>
    </div>
  );
}

export default App;
