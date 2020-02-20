import  cuid from "cuid";

import { AskStatus } from "../common/types";
import { ActionCreatorBuilder } from "./utils";

type Ask = import("../common/types").Ask;
type Optional<T, K extends string|number|symbol> = Omit<T, K> & Partial<T>;

export type AsksAction =
    | ReturnType<typeof createAsk>
    | ReturnType<typeof approveAsk>
    | ReturnType<typeof rejectAsk>
    | ReturnType<typeof nullAction>;

export const CREATE_ASK = "REJECTION/CREATE_ASK";
export const createAsk =
    new ActionCreatorBuilder(CREATE_ASK)
        .withPayloadFactory<Ask, Optional<Ask, "timestamp"|"id">>(
            ({
                question,
                askee,
                status = AskStatus.Unanswered,
                timestamp = Date.now(),
                id = cuid()
            }) => ({ question, askee, status, timestamp, id })
        )
        .build();

export const APPROVE_ASK = "REJECTION/APPROVE_ASK";
export const approveAsk =
    new ActionCreatorBuilder(APPROVE_ASK)
        .withPayload<{ id: string }>()
        .build();

export const REJECT_ASK = "REJECTION/APPROVE_ASK";
export const rejectAsk =
    new ActionCreatorBuilder(REJECT_ASK)
        .withPayload<{ id: string }>()
        .build();

export const NULL_ACTION = "REJECTION/NULL";
export const nullAction = new ActionCreatorBuilder(NULL_ACTION).build();
