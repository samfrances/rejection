import * as fromActions from "./index";
import { AskStatus } from "../common/types";

describe("createAsk()", () => {

    test("explicitly providing all fields", () => {

        const id = "asdfah";
        const timestamp = 1582219114;
        const status = AskStatus.Unanswered;
        const question = "Can I have a Sega Megadrive please Mum";
        const askee = "Me";

        const payload = { id, timestamp, status, question, askee };

        const action = fromActions.createAsk(payload);

        expect(action).toEqual({ type: fromActions.CREATE_ASK, payload });

    });

    test("omitting timestamp", () => {

        const testStartTime = Date.now();

        const id = "asdfah";
        const status = AskStatus.Unanswered;
        const question = "Can I have a Sega Megadrive please Mum";
        const askee = "Me";

        const action = fromActions.createAsk({ id, status, question, askee });

        expect(action.payload.timestamp).toBeGreaterThanOrEqual(testStartTime);

    });

    test("omitting id", () => {

        const timestamp = 1582219114;
        const status = AskStatus.Unanswered;
        const question = "Can I have a Sega Megadrive please Mum";
        const askee = "Me";

        const actionOne = fromActions.createAsk({ status, question, askee, timestamp });

        expect(actionOne.payload.id).not.toHaveLength(0);

        const actionTwo = fromActions.createAsk({ status, question, askee, timestamp });

        expect(actionTwo.payload.id).not.toHaveLength(0);

        expect(actionOne.payload.id).not.toEqual(actionTwo.payload.id);

    });

    test("should be annotated with its type", () => {

        const status = AskStatus.Unanswered;
        const question = "Can I have a Sega Megadrive please Mum";
        const askee = "Me";

        expect(fromActions.createAsk.type).toEqual(fromActions.createAsk({ status, question, askee}).type);

    });

});
