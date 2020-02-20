import * as fromActions from "../actions";
import { asks } from "./index";

describe("asks() reducer", () => {

    test("initial state", () => {
        const initialState = asks(undefined, fromActions.nullAction());
        expect(initialState)
            .toEqual({
                byId: {},
                allIds: []
            });
    });

});
