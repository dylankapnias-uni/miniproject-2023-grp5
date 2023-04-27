
import { 
  ChatCreatedEvent, 
  IChat, 
  IMessages, 
  MessageSentEvent 
} from '@mp/api/chat/util';

import { AggregateRoot } from '@nestjs/cqrs';

export class Chat extends AggregateRoot implements IChat {
  constructor(
    public chatID: string,
    public messages: IMessages[]|null|undefined,
    public timeAdderID: string|null|undefined,
    public timeRemaining: number|null|undefined,
    public totalTimeUsed: number|null|undefined,
    public users: string[]
  ) {
    super();
  }

  static fromData(chat: IChat): Chat {
    const instance = new Chat(
      chat.chatID,
      chat.messages,
      chat.timeAdderID,
      chat.timeRemaining,
      chat.totalTimeUsed,
      [chat.users[0], chat.users[1]]
    );
    return instance;
  }

  create() {
    this.apply(new ChatCreatedEvent(this.toJSON()));
  }


  public sendMessage(newMessage: IMessages) {
    if(!newMessage.message) throw new Error('Message is null');
    if(!this.messages) this.messages = [];
    this.messages.push(newMessage);
    this.apply(new MessageSentEvent(this.toJSON()));
  }

  toJSON(): IChat {
    return {
      chatID: this.chatID,
      messages: this.messages,
      timeAdderID: this.timeAdderID,
     timeRemaining: this.timeRemaining,
     totalTimeUsed: this.totalTimeUsed,
     users:[this.users[0], this.users[1]]
    };
  }
}
