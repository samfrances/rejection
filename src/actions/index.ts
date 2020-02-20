import  cuid from "cuid";

import { AskStatus } from "../common/types";
import { ActionCreatorBuilder } from "./utils";

type Ask = import("../common/types").Ask;
type Optional<T, K extends string|number|symbol> = Omit<T, K> & Partial<T>;


export const CREATE_ASK = "CREATE_ASK";
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

