import { IUnblockUserRequest } from "../requests";

export class UnblockUserCommand {
  constructor(public readonly request: IUnblockUserRequest){}
}
