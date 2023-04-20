import { IAcceptUserRequest } from '../requests';

export class AcceptUserCommand {
  constructor(public readonly request: IAcceptUserRequest) {}
}
