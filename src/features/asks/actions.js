import cuid from 'cuid';

const CREATE_ASK = 'ASK:CREATE';
const REJECT_ASK = 'ASK:REJECT';

export const createAsk = ({ question, askee } = {}) => ({
  type: CREATE_ASK,
  payload: {
    id: cuid(),
    timestamp: Date.now(),
    status: 'Unanswered',
    question,
    askee,
  },
});

export const rejectAsk = ({ id } = {}) => ({
  type: REJECT_ASK,
  payload: { id },
});
