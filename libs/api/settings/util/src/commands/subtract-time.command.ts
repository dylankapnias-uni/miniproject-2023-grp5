import { ISubtractTimeRequest } from "../requests";

export class SubtractTimeCommand {
  constructor(public readonly request: ISubtractTimeRequest){}
}