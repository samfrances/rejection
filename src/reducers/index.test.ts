import * as fromActions from "../actions";
import asks from "./index";
import { getAskById, getAskCount } from "./index";
import { AskStatus } from "../common/types";

type Ask = import("../common/types").Ask;


describe("asks() reducer", () => {

    const initialState = asks(undefined, fromActions.nullAction());

    test("initial state", () => {
        expect(initialState)
            .toEqual({
                byId: {},
                allIds: []
            });
    });

    test("should store an ask", () => {
        const id = "dsjads";
        const timestamp = 123;
        const question = "Can I have a raise?";
        const askee = "Bob";
        const status = AskStatus.Unanswered;

        const ask: Ask = {
            id,
            timestamp,
            question,
            askee,
            status,
        };
        const state = asks(
            initialState,
            fromActions.createAsk({ id, timestamp, question, askee })
        );

        expect(getAskById(state, id)).toEqual(ask);
        expect(getAskCount(state)).toEqual(1);
    });

    test("should store multile asks", () => {
        const askOne = {
            id: "hhhh",
            timestamp: 123,
            question: "Can I have a raise?",
            askee: "Bob",
        };
        const askTwo = {
            id: "iiii",
            timestamp: 1234,
            question: "Can I have a biscuit?",
            askee: "Ben",
        };
        const state = [
            fromActions.createAsk(askOne),
            fromActions.createAsk(askTwo),
         ].reduce(asks, initialState);

        expect(getAskById(state, askOne.id))
            .toEqual({ ...askOne, status: AskStatus.Unanswered });
        expect(getAskById(state, askTwo.id))
            .toEqual({ ...askTwo, status: AskStatus.Unanswered });
        expect(getAskCount(state)).toEqual(2);
    });

    test("should not allow overwriting via createAsk()", () => {
        const id = "gggg";
        const askOne = {
            id,
            timestamp: 123,
            question: "Can I have a raise?",
            askee: "Bob",
        };
        const askTwo = {
            id,
            timestamp: 1234,
            question: "Can I have a biscuit?",
            askee: "Ben",
        };
        const state = [
            fromActions.createAsk(askOne),
            fromActions.createAsk(askTwo),
        ].reduce(asks, initialState);

        expect(getAskById(state, askOne.id))
            .toEqual({ ...askOne, status: AskStatus.Unanswered });
        expect(getAskCount(state)).toEqual(1);
    });

    {
        const askIdOne = "hhhh";
        const askIdTwo = "iiii";
        const stateWithTwoAsks =
            [
                fromActions.createAsk({
                    id: askIdOne,
                    question: "Can I have a raise?",
                    askee: "Bob",
                }),
                fromActions.createAsk({
                    id: askIdTwo,
                    question: "Can I have a biscuit?",
                    askee: "Ben",
                }),
            ].reduce(asks, initialState);

        test("should facilitate accepting an ask", () => {

            const state = asks(stateWithTwoAsks, fromActions.approveAsk({ id: askIdOne }));

            expect(getAskById(state, askIdOne)!.status).toEqual(AskStatus.Accepted);
            expect(getAskById(state, askIdTwo)!.status).toEqual(AskStatus.Unanswered);

        });

        test("should not update non-existent asks", () => {

            const id = "blahblah";
            const state = asks(stateWithTwoAsks, fromActions.approveAsk({ id }));

            expect(getAskById(state, id)).toBeUndefined();
            expect(getAskById(state, askIdOne)!.status).toEqual(AskStatus.Unanswered);
            expect(getAskById(state, askIdTwo)!.status).toEqual(AskStatus.Unanswered);

        });
    }


});
