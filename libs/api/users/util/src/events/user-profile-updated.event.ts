import { IUpdateUserProfileRequest } from "../requests";

export class UserProfileUpdatedEvent{
    constructor(public readonly request: IUpdateUserProfileRequest){}
}