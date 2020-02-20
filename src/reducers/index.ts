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
        case fromActions.createAsk.type:
            return addAsk(state, action.payload);

        case fromActions.approveAsk.type:
            return updateAskStatus(state, action.payload.id, AskStatus.Accepted);

        case fromActions.rejectAsk.type:
            return updateAskStatus(state, action.payload.id, AskStatus.Rejected);

        default:
            return state;
    }
}

function addAsk(state: AsksState, ask: Ask) {
    const { id } = ask;
    if (state.byId[id]) {
        return state;
    }
    return {
        ...state,
        byId: {
            ...state.byId,
            [id]: ask
        },
        allIds: [ ...state.allIds, id ]
    };
}

function updateAskStatus(state: AsksState, id: string, status: AskStatus): AsksState {
    if (!getAskById(state, id)) {
        return state;
    }
    return {
        ...state,
        byId: {
            ...state.byId,
            [id]: {...state.byId[id], status: status }
        }
    };
}

export function getAskById(state: AsksState, id: string): Ask|undefined {
    return state.byId[id];
}

export function getAskCount(state: AsksState): number {
    return state.allIds.length;
}
