import { IUserProfile } from '../interfaces';

export class CreateMockUserCommand {
  constructor(public readonly user: IUserProfile) {}
}