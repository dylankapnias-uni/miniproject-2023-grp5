import {  } from "../requests";
import { ICreateChatListRequest } from "../requests/create-chat-list.request";

export class CreateChatListCommand {
    constructor(public readonly request: ICreateChatListRequest) {}
}