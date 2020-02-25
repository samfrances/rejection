import React from 'react';
import './App.css';

import NewAskForm from "./NewAskForm";
import AsksList from "./AsksList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 data-testid="title">Rejection App</h1>
      </header>
      <NewAskForm />
      <AsksList />
    </div>
  );
}

export default App;
