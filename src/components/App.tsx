import React, { useReducer } from 'react';

import reducer, { initialState, getAllAsks, score } from "../reducers";
import * as fromActions from "../actions";

import AppView from "./AppView";

export default function App() {

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
    <AppView
      asks={[...getAllAsks(state)]}
      score={score(state)}
      onSubmitAsk={onSubmitAsk}
      accept={accept}
      reject={reject} />
  );

}
