import { IUserMatch } from '../interfaces';

export interface IAcceptUserRequest {
  userId: string,
  userMatch: IUserMatch,
}
