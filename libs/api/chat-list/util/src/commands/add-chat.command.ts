import { IAddChatRequest } from "../requests";

export class AddChatCommand {
    constructor(public readonly request: IAddChatRequest) {}
}