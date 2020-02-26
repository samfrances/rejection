import React, { useReducer } from 'react';

import { isAsk } from "../common/ask";
import reducer, { initialState, getAllAsks, score } from "../reducers";
import * as fromActions from "../actions";

import AppView from "./AppView";

type Ask = import("../common/ask").Ask;
type AsksState = import("../reducers").AsksState;

export const STORAGE_KEY = "rejection-app"



export default function App() {

  const [state, dispatch] = useReducer(reducer, initialState(), init);

  // Store changes in localStorage
  const allAsks = [...getAllAsks(state)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ asks: [...getAllAsks(state)] }));

  const onSubmitAsk =
    (question: string, askee: string) => {
        dispatch(fromActions.createAsk({ question, askee }));
    };

  const reject =
    (id: string) => { dispatch(fromActions.rejectAsk({ id })); };

  const accept =
    (id: string) => { dispatch(fromActions.approveAsk({ id })); };

  return (
    <AppView
      asks={allAsks}
      score={score(state)}
      onSubmitAsk={onSubmitAsk}
      accept={accept}
      reject={reject} />
  );

}

/**
 * Load state from Localstorage
 */
function init(initialState: AsksState): AsksState {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    console.log("No saved state to load.")
    return initialState;
  }

  const errorMessage = "Saved state was invalid.";
  const asksUnvalidated: Ask[] = JSON.parse(data).asks;
  if (asksUnvalidated === undefined) {
    console.error(errorMessage);
    return initialState;
  }

  // Check if stored asks are any array
  if (typeof asksUnvalidated.filter !== "function") {
    console.error(errorMessage);
    return initialState;
  }

  // Filter out any invalid entries
  const asks = asksUnvalidated.filter(isAsk);

  if (asks.length < 1 && asksUnvalidated.length > 0) {
    console.error(errorMessage);
    return initialState;
  }

  const actions = asks.map(ask => fromActions.createAsk(ask));
  const state = actions.reduce(reducer, initialState);

  console.log("Reconstructed state from storage successfully.")
  return state;
}