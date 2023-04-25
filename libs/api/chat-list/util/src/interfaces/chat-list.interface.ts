import { IChatReferences } from "./chat-references.interface";

export interface IChatList {
    userId: string,
    chatRef: IChatReferences[]|null|undefined
}