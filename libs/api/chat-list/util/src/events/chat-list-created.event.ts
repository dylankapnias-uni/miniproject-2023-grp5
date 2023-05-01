import { IChatList } from "../interfaces";

export class ChatListCreatedEvent {
    constructor(public readonly chat: IChatList) {}
  }
  