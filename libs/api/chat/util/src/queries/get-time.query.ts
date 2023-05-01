import { IGetTimeRequest } from "../requests";

export class GetTimeQuery{
  constructor(public readonly request: IGetTimeRequest) {}
}