import { IRejectUserRequest } from '../requests';

export class RejectUserCommand {
  constructor(public readonly request: IRejectUserRequest) {}
}
