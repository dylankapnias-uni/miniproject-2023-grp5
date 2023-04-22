import { IUnblockUserRequest } from "../requests";
export class UserUnblockedEvent {
  constructor(public readonly request: IUnblockUserRequest){}
}