import { ProfilePrivacy } from "../enums";

export interface IUpdatePrivacyResponse {
  userId: string,
  privacy: ProfilePrivacy
}
