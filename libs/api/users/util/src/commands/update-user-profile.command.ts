import { IUpdateUserProfileRequest } from "../requests";

export class UpdateUserProfileCommand {
    constructor(public readonly request: IUpdateUserProfileRequest){}
}