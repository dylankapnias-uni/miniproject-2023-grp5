import { ProfilePrivacy } from "../enums";

export interface PrivacDetails {
  privacyDetails: ProfilePrivacy,
  blockedAccounts: string[],
}