type Ask = import("../common/types").Ask;
type AsksAction = import("../actions").AsksAction

interface AsksState {
    byId: {
        [id: string]: Ask;
    };
    allIds: string[];
}

export function asks(
    state: AsksState = { byId: {}, allIds: []},
    action: AsksAction
) {
    return state;
}
