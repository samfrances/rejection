
export enum AskStatus {
    Accepted = "Accepted",
    Rejected = "Rejected",
    Unanswered = "Unanswered",
}

export interface Ask {
  id: string;
  timestamp: number;
  question: string;
  askee: string;
  status: AskStatus;
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