import cuid from 'cuid';

const CREATE_ASK = 'ASK:CREATE';

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
