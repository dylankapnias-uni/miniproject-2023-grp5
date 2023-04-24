export class SwipeReject{
    static readonly type = '[SwipeReject] Swipe Reject';
    constructor(public payload: { uid: string }) {}
}

export class SwipeAccept{
    static readonly type = '[SwipeAccept] Swipe Accept';
    constructor(public payload: { uid: string }) {}
}

export class GetCards{
    static readonly type = '[GetCards] Get Cards';
    constructor(public payload: { uid: string }) {}
}

//call if we stick with search bar
export class FilterCards{
    static readonly type = '[FilterCards] Filter Cards';
    constructor(public payload: { query: string }) {}
}