import React from 'react';

import "../css/AsksList.css";

import { Ask, AskStatus } from "../common/ask";
import { TestIDs } from "./constants";

interface Props {
    asks: Ask[];
    reject: (askId: string) => void;
    accept: (askId: string) => void;
}

export default function AsksList({ asks, reject, accept }: Props) {
  return (
    <div data-testid={TestIDs.AsksList} className="asks-list">
      <table>
        {
          asks.length < 1
            ? null
            : <Header />
        }

        <tbody>
        {
          asks.map(ask => (
            <tr key={ask.id} className="ask" data-testid={`ask=${ask.id}`}>
              <td className="ask-question">{ask.question}</td>
              <td className="ask-askee">{ask.askee}</td>
              <td className="ask-date">
                <FormattedDate timestamp={ask.timestamp} />
              </td>
              <td className={`ask-status ${ask.status}`}>
                {
                  ask.status === AskStatus.Unanswered
                    ? <AcceptRejectButtons
                        askId={ask.id}
                        accept={accept}
                        reject={reject} />
                    : ask.status
                }
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}

function Header() {
  return (
    <thead data-testid={TestIDs.AsksListHeader}>
      <tr>
        <th>Question</th>
        <th>Askee</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>
  );
}

function AcceptRejectButtons({
  askId,
  accept,
  reject
}: { askId: string} & Pick<Props, "accept"|"reject">) {
  return (
    <React.Fragment>
      <button
        className="accept"
        onClick={() => { accept(askId); }}>
          Accept
      </button>
      <button
        className="reject"
        onClick={() => { reject(askId); }}>
          Reject
      </button>
    </React.Fragment>
  );
}

function FormattedDate({ timestamp }: { timestamp: number }) {
  return (
    <time dateTime={(new Date(timestamp)).toString()}>
      {new Date(timestamp).toLocaleString()}
    </time>
  );
}
