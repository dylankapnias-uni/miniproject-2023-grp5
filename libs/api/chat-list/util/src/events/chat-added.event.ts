import { IChatList } from "../interfaces";

export class ChatAddedEvent {
    constructor(public readonly chat: IChatList) {}
  }
  