import React from "react";
import "../css/Score.css";
import { TestIDs } from "./constants";

export default function Score({ score }: { score: number }) {
    return (
        <div data-testid={TestIDs.Score} className="score-container">
            Score: <span className="score">{score}</span>
        </div>
    );
}