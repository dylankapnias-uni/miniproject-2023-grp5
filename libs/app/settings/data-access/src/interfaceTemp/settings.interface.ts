import { ITime } from './time.interface';
import { IPrivacyDetails } from './privacy-settings.interface';
export interface ISettings {
  userId: string,
  privacy: IPrivacyDetails,
  time: ITime,
}