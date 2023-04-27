import { IChatReferences } from "./chat-references.interface";

export interface IChatList {
    userId: string,
    chatList: IChatReferences[]|null|undefined
}