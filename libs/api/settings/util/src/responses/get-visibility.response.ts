import { ProfilePrivacy } from "../enums";

export interface IGetVisibilityResponse {
  userId: string,
  profileVisibility: ProfilePrivacy | undefined
}