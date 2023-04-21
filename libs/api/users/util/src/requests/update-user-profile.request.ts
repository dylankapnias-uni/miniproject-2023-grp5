import { IUserProfile } from "../interfaces";

export interface IUpdateUserProfileRequest {
    userId: string;
    userProfile: IUserProfile;
}
