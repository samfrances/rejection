
export enum AskStatus {
    Accepted = "Accepted",
    Rejected = "Rejected",
    Unanswered = "Unanswered",
}

function isAskStatus(potentialAskStatus: any): potentialAskStatus is AskStatus {
  switch(potentialAskStatus) {
    case AskStatus.Accepted:
    case AskStatus.Rejected:
    case AskStatus.Unanswered:
      return true;
    default:
      return false;
  }
}

export interface Ask {
  id: string;
  timestamp: number;
  question: string;
  askee: string;
  status: AskStatus;
}

export function isAsk(potentialAsk: any): potentialAsk is Ask {
  const { id, question, askee, timestamp, status} = potentialAsk;
  return Boolean(
    typeof id === "string"
    && typeof question === "string"
    && typeof askee === "string"
    && typeof timestamp === "number"
    && isAskStatus(status)
  );
}

function sum(nums: number[]) {
    return nums.reduce((x, y) => x + y, 0);
}

function scoreAsk(ask: Ask): number {
    switch (ask.status) {
        case AskStatus.Accepted: return 1;
        case AskStatus.Rejected: return 10;
        default: return 0;
    }
}

export function getScore(asks: Ask[]): number {
    return sum(asks.map(scoreAsk));
}
