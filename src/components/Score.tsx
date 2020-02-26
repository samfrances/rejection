import React from "react";

import { TestIDs } from "./constants";

export default function Score({ score }: { score: number }) {
    return (
        <div data-testid={TestIDs.Score}>
            Score: <span className="score">{score}</span>
        </div>
    );
}