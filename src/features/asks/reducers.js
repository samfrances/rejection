import { createAsk, rejectAsk, acceptAsk } from './actions';
// Eric Elliott cuid lib

export const defaultState = {
  byId: {
    // 1: { id: 1 },
    // 2: { id: 2 },
  },
};

const withStatus = (state, id, status) => {
  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        status: status,
      },
    },
  };
};

export const asksReducer = (state = defaultState, action = { type: '' }) => {
  const { type, payload } = action;

  switch (type) {
    case createAsk().type:
      return {
        ...state,
        byId: { ...state.byId, [payload.id]: { ...payload } },
      };

    case rejectAsk().type:
      return withStatus(state, payload.id, 'Rejected');

    case acceptAsk().type:
      return withStatus(state, payload.id, 'Accepted');

    default:
      return state;
  }
};
