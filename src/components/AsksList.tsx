import React from 'react';

import { Ask, AskStatus } from "../common/types";
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
        <tbody>
        {
          asks.map(ask => (
            <tr key={ask.id} className="ask" data-testid={`ask=${ask.id}`}>
              <td className="ask-question">{ask.question}</td>
              <td className="ask-askee">{ask.askee}</td>
              <td className="ask-date">{new Date(ask.timestamp).toLocaleString()}</td>
              <td className={`ask-status ${ask.status}`}>
                {
                  ask.status === AskStatus.Unanswered
                    ? (
                      <React.Fragment>
                        <button
                          className="accept"
                          onClick={() => { accept(ask.id); }}>
                            Accept
                        </button>
                        <button
                          className="reject"
                          onClick={() => { reject(ask.id); }}>
                            Reject
                        </button>
                      </React.Fragment>
                    )
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