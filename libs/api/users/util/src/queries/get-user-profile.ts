import { IGetUserProfileRequest } from "../requests";

export class GetUserProfileQuery {
    constructor(public readonly request: IGetUserProfileRequest){}
}