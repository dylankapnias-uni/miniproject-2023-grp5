export class CreateSetting{
    static readonly type = '[CreateSetting] Creat Setting';
    constructor(public payload: {id:string}){}
}