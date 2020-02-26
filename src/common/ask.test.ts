import cuid from "cuid";

import { getScore, AskStatus } from "./ask";

type Ask = import("../common/ask").Ask;


describe("getScore()", () => {

    test("should return 0 for an empty list of asks", () => {
        expect(getScore([])).toBe(0);
    });

    test("a single unanswered Ask scores zero", () => {
        const ask: Ask = {
            question: "foo",
            askee: "bar",
            timestamp: Date.now(),
            id: cuid(),
            status: AskStatus.Unanswered
        };
        expect(getScore([ask])).toBe(0);
    });

    test("multiple unanswered Ask scores zero", () => {
        const asks: Ask[] = [
            {
                question: "foo",
                askee: "bar",
                timestamp: Date.now(),
                id: cuid(),
                status: AskStatus.Unanswered
            },
            {
                question: "bar",
                askee: "foo",
                timestamp: Date.now(),
                id: cuid(),
                status: AskStatus.Unanswered
            },
            {
                question: "baz",
                askee: "bar",
                timestamp: Date.now(),
                id: cuid(),
                status: AskStatus.Unanswered
            },
        ];
        expect(getScore(asks)).toBe(0);
    });

    test("a single accepted Ask scores 1", () => {
        const ask: Ask = {
            question: "foo",
            askee: "bar",
            timestamp: Date.now(),
            id: cuid(),
            status: AskStatus.Accepted
        };
        expect(getScore([ask])).toBe(1);
    });

    test("a single rejected Ask scores 10", () => {
        const ask: Ask = {
            question: "foo",
            askee: "bar",
            timestamp: Date.now(),
            id: cuid(),
            status: AskStatus.Rejected
        };
        expect(getScore([ask])).toBe(10);
    });

    test("mixed example", () => {
        const asks: Ask[] = [
            {
                question: "foo",
                askee: "bar",
                timestamp: Date.now(),
                id: cuid(),
                status: AskStatus.Unanswered
            },
            {
                question: "bar",
                askee: "foo",
                timestamp: Date.now(),
                id: cuid(),
                status: AskStatus.Rejected
            },
            {
                question: "baz",
                askee: "bar",
                timestamp: Date.now(),
                id: cuid(),
                status: AskStatus.Accepted
            },
            {
                question: "Can I have a raise?",
                askee: "Boss",
                timestamp: Date.now(),
                id: cuid(),
                status: AskStatus.Accepted
            },
            {
                question: "Can I have a promotion?",
                askee: "Boss",
                timestamp: Date.now(),
                id: cuid(),
                status: AskStatus.Rejected
            },
            {
                question: "hahaha",
                askee: "heeheehee",
                timestamp: Date.now(),
                id: cuid(),
                status: AskStatus.Unanswered
            },
        ];
        expect(getScore(asks)).toBe(0 + 10 + 1 + 1 + 10 + 0);
    });

});