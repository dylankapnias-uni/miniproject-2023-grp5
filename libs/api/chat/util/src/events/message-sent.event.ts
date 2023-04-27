import { IChat } from "../interfaces";

export class MessageSentEvent {
  constructor(public readonly chat:IChat){}
}