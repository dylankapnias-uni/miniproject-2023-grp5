import { IDeleteUserProfileRequest } from "../requests";

export class UserProfileDeletedEvent {
    constructor(public readonly request: IDeleteUserProfileRequest) {}
}