import { IInterests } from '@mp/api/interests/util';
import { IUserMatch } from '../interfaces';

export interface IRetrieveHomeUsersRequest {
  userId: string,
  filter: IInterests[]|null|undefined,
}
