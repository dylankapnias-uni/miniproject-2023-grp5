import { ChatAddedEvent, ChatListCreatedEvent, IChatList, IChatReferences } from '@mp/api/chat-list/util';

import { AggregateRoot } from '@nestjs/cqrs';

export class Chatlist extends AggregateRoot implements IChatList {
constructor(
  public userId: string,
  public chatRef: IChatReferences[]|null|undefined,
) {
  super();
  if(!chatRef){
    this.chatRef=[];
  }
}

static fromData(chatList:IChatList): Chatlist {
  const instance = new Chatlist(
    chatList.userId,
    chatList.chatRef
  );
  return instance;
}

create() {
  this.apply(new ChatListCreatedEvent(this.toJSON()));
}

addChat(chatRef: IChatReferences) {
  if(!this.chatRef) this.chatRef=[];
  this.chatRef.push(chatRef);

  this.apply(new ChatAddedEvent(this.toJSON()));
}

toJSON(): IChatList {
  return {
    userId: this.userId,
    chatRef: this.chatRef,
  };
}
}
