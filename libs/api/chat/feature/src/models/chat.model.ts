
import { IChat, IMessages, MessageSentEvent } from '@mp/api/chat/util';
import { UserHomeCreatedEvent, IHome, IMatched, IParsingData, IUserMatch, IUserRef, UserAcceptedEvent, UserRejectedEvent } from '@mp/api/home/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class Chat extends AggregateRoot implements IChat {
  constructor(
    public ChatID: string,
    public messages: IMessages[]|null|undefined,
    public timeAdderID: string|null|undefined,
    public timeRemaining: number|null|undefined,
    public totalTimeUsed: number|null|undefined
  ) {
    super();
  }

  static fromData(chat: IChat): Chat {
    const instance = new Chat(
      chat.ChatID,
      chat.messages,
        chat.timeAdderID,
        chat.timeRemaining,
        chat.totalTimeUsed
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

  public rejectUser(newUserId: string) {

      this.userRef.visited.push(newUserId);
      this.apply(new UserRejectedEvent(this.toJSON()));
    
  }

  toJSON(): IChat {
    return {
      ChatID: this.ChatID,
      messages: this.messages,
      timeAdderID: this.timeAdderID,
     timeRemaining: this.timeRemaining,
     totalTimeUsed: this.totalTimeUsed
    };
  }
}
