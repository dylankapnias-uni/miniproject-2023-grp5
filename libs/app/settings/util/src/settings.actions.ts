export class UpdateAccount{
    static readonly type = '[UpdateAccount] Update Account';
    constructor(public payload: { account: any }) {}
}

export class DeleteAccount{
    static readonly type = '[DeleteAccount] Delete Account';
    constructor(public payload: { uid: string }) {}
}

export class EditProfile{
    static readonly type = '[EditProfile] Edit Profile';
    constructor(public payload: { profile: any }) {}
}

export class BuyTime{
    static readonly type = '[BuyTime] Buy Time';
    constructor(public payload: { time: number,  uid: string }) {}
}

export class Unblock{
    static readonly type = '[Unblock] Unblock';
    constructor(public payload: { uid: string }) {}
}

export class GetBlocked{
    static readonly type = '[GetBlocked] Get Blocked';
    constructor(public payload: { uid: string }) {}
}

export class CreateSetting{
    static readonly type = '[CreateSetting] Create settings';
    constructor(public payload: {id: string}){};
}