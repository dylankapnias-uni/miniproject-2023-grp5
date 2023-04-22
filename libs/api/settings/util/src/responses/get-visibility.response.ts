import { ProfilePrivacy } from "../enums";

export interface IGetProfileVisibilityResponse {
  userId: string,
  profileVisibility: ProfilePrivacy | undefined
}