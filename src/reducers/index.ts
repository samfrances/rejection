import * as fromActions from "../actions";
import { AskStatus } from "../common/types";

type Ask = import("../common/types").Ask;
type AsksAction = import("../actions").AsksAction

interface AsksState {
    byId: {
        [id: string]: Ask;
    };
    allIds: string[];
}

export default function asks(
    state: AsksState = { byId: {}, allIds: [] },
    action: AsksAction
) {
    switch (action.type) {
        case fromActions.createAsk.type: {
            const { id } = action.payload;
            if (state.byId[id]) {
                return state;
            }
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id]: action.payload
                },
                allIds: [ ...state.allIds, id ]
            };
        }

        case fromActions.approveAsk.type: {
            const { id } = action.payload;
            if (!getAskById(state, id)) {
                return state;
            }
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id]: {...state.byId[id], status: AskStatus.Accepted }
                }
            };
        }

        default:
            return state;
    }
}

export function getAskById(state: AsksState, id: string): Ask|undefined {
    return state.byId[id];
}

export function getAskCount(state: AsksState): number {
    return state.allIds.length;
}
