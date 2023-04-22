export class GetMessages{
    static readonly type = '[GetMessages] Get Messages';
    constructor(public payload: { cid: string }) {}
}

export class SendMessage {
    static readonly type = '[SendMessage] Send Message';
    constructor(public payload: { message: string, cid: string }) {}
}

export class AddTime{
    static readonly type = '[AddTime] Add Time';
    constructor(public payload: { time: number, cid:string }) {}
}

export class GetTime{
    static readonly type = '[GetTime] Get Time';
    constructor(public payload: { cid: string }) {}
}

export class RemoveTime{
    static readonly type = '[RemoveTime] Remove Time';
    constructor(public payload: { cid: string }) {}
}