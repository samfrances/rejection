
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
