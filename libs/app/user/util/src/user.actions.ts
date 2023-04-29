export class GetUser{
    static readonly type = '[GetUser] GetUser';
    constructor(public payload: {userId : string}){}
}