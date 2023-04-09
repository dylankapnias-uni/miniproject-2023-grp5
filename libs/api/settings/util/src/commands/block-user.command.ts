import { IBlockUserRequest } from "../requests";

export class BlockUserCommand {
  constructor(public readonly request: IBlockUserRequest){}
}
