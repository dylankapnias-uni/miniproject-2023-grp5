import { ChatAddedEvent, ChatListCreatedEvent, IChatList, IChatReferences } from '@mp/api/chat-list/util';

import { AggregateRoot } from '@nestjs/cqrs';

export class Chatlist extends AggregateRoot implements IChatList {
constructor(
  public userId: string,
  public chatList: IChatReferences[]|null|undefined,
) {
  super();
  if(!chatList){
    this.chatList=[];
  }
}

static fromData(chatList:IChatList): Chatlist {
  const instance = new Chatlist(
    chatList.userId,
    chatList.chatList
  );
  return instance;
}

create() {
  this.apply(new ChatListCreatedEvent(this.toJSON()));
}

addChat(chatRef: IChatReferences) {
  if(!this.chatList) this.chatList=[];
  this.chatList.push(chatRef);

  this.apply(new ChatAddedEvent(this.toJSON()));
}

toJSON(): IChatList {
  return {
    userId: this.userId,
    chatList: this.chatList,
  };
}
}
