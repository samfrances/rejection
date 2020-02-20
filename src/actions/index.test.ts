import * as fromActions from "./index";
import { AskStatus } from "../common/types";

describe("createAsk()", () => {

    const id = "asdfah";
    const timestamp = 1582219114;
    const status = AskStatus.Unanswered;
    const question = "Can I have a Sega Megadrive please Mum";
    const askee = "Me";

    test("explicitly providing all fields", () => {

        const payload = { id, timestamp, status, question, askee };

        const action = fromActions.createAsk(payload);

        expect(action).toEqual({ type: fromActions.CREATE_ASK, payload });

    });

    test("omitting timestamp", () => {

        const testStartTime = Date.now();

        const action = fromActions.createAsk({ id, question, askee });

        expect(action.payload.timestamp).toBeGreaterThanOrEqual(testStartTime);

    });

    test("omitting id", () => {

        const actionOne = fromActions.createAsk({ question, askee, timestamp });

        expect(actionOne.payload.id).not.toHaveLength(0);

        const actionTwo = fromActions.createAsk({ question, askee, timestamp });

        expect(actionTwo.payload.id).not.toHaveLength(0);

        expect(actionOne.payload.id).not.toEqual(actionTwo.payload.id);

    });

    test("should be annotated with its type", () => {

        expect(fromActions.createAsk.type).toEqual(fromActions.createAsk({ question, askee}).type);

    });

});

describe("approveAsk()", () => {

    test("action creator", () => {

        const payload = { id: "jjhfaso" };
        expect(fromActions.approveAsk(payload))
            .toEqual({ type: fromActions.APPROVE_ASK, payload });

    });

    test("should be annotated with its type", () => {

        expect(fromActions.approveAsk.type).toEqual(fromActions.approveAsk({ id: "h" }).type);

    });

});

describe("rejectAsk()", () => {

    test("action creator", () => {

        const payload = { id: "jjhfaso" };
        expect(fromActions.rejectAsk(payload))
            .toEqual({ type: fromActions.REJECT_ASK, payload });

    });

    test("should be annotated with its type", () => {

        expect(fromActions.rejectAsk.type).toEqual(fromActions.rejectAsk({ id: "h" }).type);

    });

});