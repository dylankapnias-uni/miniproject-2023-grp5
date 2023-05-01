import { IChatList, IChatReferences } from "../interfaces";

export interface IAddChatRequest{
    userId:string,
    chatRef: {
        chatRef: string,
        otherUserId: string
    }
}