import { IChatList, IChatReferences } from "../interfaces";

export interface IAddChatRequest{
    userId:string,
    chatRef: IChatReferences
}