export class CreateSetting{
    static readonly type = '[CreateSetting] Create Setting';
    constructor(public payload: {id:string}){}
}
//TODO Fix after testing
export class CreateUserProfile{
    static readonly type = '[CreateUserProfile] Create User Profile';
    constructor(public payload: {id:string}){}
}

export class GetUserProfile{
    static readonly type = '[GetUserProfile] GetUser Profile';
    constructor(public payload: {id:string}){}
}

export class UpdateUserProfile{
    static readonly type = '[UpdateUserProfile] Update User Profile';
    constructor(public payload: {id:string}){}
}

export class DeleteUserProfile{
    static readonly type = '[DeleteUserProfile] Delete User Profile';
    constructor(public payload: {id:string}){}
}