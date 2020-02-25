import React from 'react';
import '../css/normalize.css';
import '../css/skeleton.css';
import "../css/App.css";

import NewAskForm from "./NewAskForm";
import AsksList from "./AsksList";

function App() {
  return (
    <div className="App container">
      <header className="App-header row">
        <div className="twelve columns">
          <h1 data-testid="title">Rejection App</h1>
        </div>
      </header>
      <div className="row">
        <div className="twelve columns">
          <NewAskForm onSubmitAsk={() => {}} />
        </div>
      </div>
      <div className="row">
        <div className="twelve columns">
          <AsksList />
        </div>
      </div>
    </div>
  );
}

export default App;
