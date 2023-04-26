import { IChat } from '../interfaces';

export class ChatCreatedEvent {
  constructor (public readonly chat: IChat){}
}