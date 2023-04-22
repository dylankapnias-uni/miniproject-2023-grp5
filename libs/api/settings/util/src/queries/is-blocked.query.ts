import { IIsBlockedRequest } from "../requests";

export class IsBlockedQuery{
  constructor(public readonly request: IIsBlockedRequest){}
}