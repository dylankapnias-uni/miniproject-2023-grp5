import { IUserProfile } from '../interfaces';

export interface IGetUserProfileListResponse {
  profiles: IUserProfile[];
  failed: string[];
}