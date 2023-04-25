//All need user id

//Noti id. 
export class RemoveNotification{
    static readonly type = '[RemoveNotification] Remove Notification';
    constructor(public payload: { nid: string,  uid: string }) {}
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