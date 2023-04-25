import { IGetBlockedAccountsRequest } from "../requests";

export class GetBlockedAccountsQuery{
  constructor(public readonly request: IGetBlockedAccountsRequest){}
}