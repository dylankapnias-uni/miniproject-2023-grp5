export class GetMessages {
    static readonly type = '[GetMessages] Get Messages';
}

export class SearchMessages{
    static readonly type = '[SearchMessages] Search Messages';
    constructor(public payload: {query:string}){}
}