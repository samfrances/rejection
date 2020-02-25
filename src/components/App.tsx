import React from 'react';
import './App.css';

import NewAskForm from "./NewAskForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 data-testid="title">Rejection App</h1>
        <NewAskForm />
      </header>
    </div>
  );
}

export default App;
