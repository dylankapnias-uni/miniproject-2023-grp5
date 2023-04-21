import { ProfilePrivacy } from "../enums";

export interface IUpdatePrivacyRequest {
  userId: string,
  profileVisibility: ProfilePrivacy,
}