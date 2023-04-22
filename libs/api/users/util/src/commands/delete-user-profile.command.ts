import { IDeleteUserProfileRequest } from "../requests";

export class DeleteUserProfileCommand {
    constructor(public readonly request: IDeleteUserProfileRequest){}
}