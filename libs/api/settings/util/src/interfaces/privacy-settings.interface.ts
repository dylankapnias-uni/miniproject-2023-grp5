import { ProfilePrivacy } from "../enums";

export interface IPrivacyDetails {
  profileVisibility: ProfilePrivacy,
  blockedAccounts: string[],
}