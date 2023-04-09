import { IAddTimeRequest } from "../requests";

export class AddTimeCommand {
  constructor(public readonly request: IAddTimeRequest){}
}