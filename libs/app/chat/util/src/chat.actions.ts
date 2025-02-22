import { IMessages } from '@mp/api/chat/util';
export class GetMessages{
    static readonly type = '[GetMessages] Get Messages';
    constructor(public payload: { cid: string }) {}
}

export class SendMessage {
    static readonly type = '[SendMessage] Send Message';
    constructor(public payload: { message: IMessages, cid: string, uid:string }) {}
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
    constructor(public payload: { cid: string, time : number }) {}
}

export class GetChatList{
    static readonly type = '[GetChatList] Get Chat List';
    constructor(public payload: { uid:string}) {}
}

export class GetUser{
    static readonly type = '[GetUser] Get User';
    constructor(public payload: { ouid:string }) {}
}