import { IInbox } from "@mp/api/notifications/util";
//All need user id

//Noti id. 
export class RemoveNotification{
    static readonly type = '[RemoveNotification] Remove Notification';
    constructor(public payload: { uid: string,  inbox: number }) {}
}

//needs uid
export class RemoveAllNotifications{
    static readonly type = '[RemoveAllNotifications] Remove All Notifications';
    constructor(public payload: { uid: string }) {}
}


//needs uid
export class SetNotifications{
    static readonly type = '[SetNotifications] Set Notifications';
    constructor(public payload: { uid: string }) {}
}

export class FetchNotifications{
    static readonly type = '[FetchNotifications] Fetch Notifications';
    constructor(public payload: { uid: string }) {}
}