export class GetMessages {
    static readonly type = '[GetMessages] Get Messages';
    constructor(public payload: {uid: string}) { }
}

export class SearchMessages{
    static readonly type = '[SearchMessages] Search Messages';
    constructor(public payload: {query:string}){}
}

export class RemoveTime{
    static readonly type = '[RemoveTime] Remove Time';
    constructor(public payload: {cid:string}){}
}

export class GetUsers{
    static readonly type = '[GetUsers] Get Users';
    constructor(public payload: {uid:string}){}
}