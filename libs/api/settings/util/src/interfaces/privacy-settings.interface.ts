import { ProfilePrivacy } from "../enums";

export interface PrivacDetails {
  profileVisibility: ProfilePrivacy,
  blockedAccounts: string[],
}