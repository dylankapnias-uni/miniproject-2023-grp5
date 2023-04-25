import { IFetchChatListRequest } from "../requests";

export class FetchChatListQuery {
    constructor(public readonly request: IFetchChatListRequest) {}
}