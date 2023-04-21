import { IBlockUserRequest } from "../requests";
export class UserBlockedEvent {
  constructor(public readonly request: IBlockUserRequest){}
}