import * as fromActions from "../actions";
import * as ask from "../common/ask";
import { AskStatus } from "../common/ask";

type Ask = import("../common/ask").Ask;
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

export function initialState() {
    return asks(undefined, fromActions.nullAction());
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

function getAskIds(state: AsksState) {
    return state.allIds;
}

export function* getAllAsks(state: AsksState): Generator<Ask> {
    for (const askId of getAskIds(state)) {
        const ask = getAskById(state, askId);
        if (ask) {
            yield ask;
        }
    }
}

export function score(state: AsksState) {
    ask.getScore([...getAllAsks(state)]);
}
