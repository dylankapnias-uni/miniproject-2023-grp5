import { IGetProfileVisibilityRequest } from "../requests";

export class GetVisibilityQuery{
  constructor(public readonly request: IGetProfileVisibilityRequest){}
}