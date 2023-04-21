import { IUserProfile } from '../interfaces';

export class UserCreatedEvent {
  constructor(public readonly user: IUserProfile) {}
}
