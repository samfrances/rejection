import { createAsk, rejectAsk } from './actions';
// Eric Elliott cuid lib

export const defaultState = {
  byId: {
    // 1: { id: 1 },
    // 2: { id: 2 },
  },
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
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.id]: {
            ...state.byId[payload.id],
            status: 'Rejected',
          },
        },
      };

    default:
      return state;
  }
};
