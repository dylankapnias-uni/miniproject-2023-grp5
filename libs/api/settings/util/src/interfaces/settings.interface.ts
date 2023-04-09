import { ITime } from './time.interface';
import { ProfilePrivacy } from '../enums';
export interface ISettings {
  userId: string,
  privacy: ProfilePrivacy,
  time: ITime,
}