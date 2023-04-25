import { Timestamp } from '@firebase/firestore-types';
import { IInterests } from '@mp/api/interests/util';
import { IPost } from '@mp/api/users/util';

export class UpdateAccount{
    static readonly type = '[UpdateAccount] Update Account';
    constructor(public payload: {
        uid: string,
        email: string,
        name: string,
        profilePicture: string,
        phoneNumber: string,
        customClaims: { [key: string]: any } | null | undefined,
        age: number,
        bio: string,
        dob: Timestamp,
        gender: string,
        interests: IInterests[],
        sexuality: string,
        time: number,
        posts: IPost[]
    }) {}
}

export class DeleteAccount{
    static readonly type = '[DeleteAccount] Delete Account';
    constructor(public payload: { uid: string }) {}
}

export class EditProfile{
    static readonly type = '[EditProfile] Edit Profile';
    constructor(public payload: { 
        uid: string,
        email: string,
        name: string,
        profilePicture: string,
        phoneNumber: string,
        customClaims: { [key: string]: any } | null | undefined,
        age: number,
        bio: string,
        dob: Timestamp,
        gender: string,
        interests: IInterests[],
        sexuality: string,
        time: number,
        posts: IPost[]
    }) {}
}

export class BuyTime{
    static readonly type = '[BuyTime] Buy Time';
    constructor(public payload: { time: number,  uid: string }) {}
}

export class Unblock{
    static readonly type = '[Unblock] Unblock';
    constructor(public payload: { uid: string, unblockId: string }) {}
}

export class GetBlocked{
    static readonly type = '[GetBlocked] Get Blocked';
    constructor(public payload: { uid: string }) {}
}

export class CreateSetting{
    static readonly type = '[CreateSetting] Create settings';
    constructor(public payload: {id: string}){};
}

export class Block{
    static readonly type = '[Block] Block';
    constructor(public payload: {uid: string, blockId: string}){};
}