
/**
 * Factory for creating action creator functions of a simple { type } or
 * { type, payload } format, with strong typing. The factory also adds
 * a strongly typed `.type` annotation to the built function.
 */
export class ActionCreatorBuilder<TType> {
    constructor(
        private type: TType
    ) {}

    public withPayloadFactory<TPayload extends TArgs, TArgs = TPayload>(
        factory: (args: TArgs) => TPayload
    ) {
        return new PayloadFactoryActionCreatorBuilder<TType, TPayload, TArgs>(this.type, factory);
    }

    public withPayload<TPayload = {}>() {
        return new PayloadActionCreatorBuilder<TType, TPayload>(this.type);
    }

    public build() {
        const creator = (): {type: TType} => ({ type: this.type });
        creator.type = this.type;
        return creator;
    }
}

class PayloadActionCreatorBuilder<TType, TPayload = {}>{
    constructor(
        private type: TType
    ) {}

    public build() {
        const creator =
            (payload: TPayload): {type: TType; payload: TPayload} => ({type: this.type, payload });
        creator.type = this.type;
        return creator;
    }
}

class PayloadFactoryActionCreatorBuilder<TType, TPayload extends TArgs, TArgs = {}>{
    constructor(
        private type: TType,
        private factory: (args: TArgs) => TPayload
    ) {}

    public build() {
        const creator =
            (args: TArgs): {type: TType; payload: TPayload} => ({type: this.type, payload: this.factory(args) });
        creator.type = this.type;
        return creator;
    }
}

