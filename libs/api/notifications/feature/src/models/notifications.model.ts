import { IInbox, INotification, NotificationSentEvent,NotificationDeletedEvent, NotificationCreatedEvent, NotificationsClearedEvent } from '@mp/api/notifications/util';

import { AggregateRoot } from '@nestjs/cqrs';

export class Notification extends AggregateRoot implements INotification {
  constructor(
    public userId: string,
    public inbox:IInbox[]|null|undefined,
  ) {
    super();
    if(this.inbox==null || this.inbox==undefined){
      this.inbox=[]; 
    }
  }

  static fromData(notif: INotification): Notification {
    const instance = new Notification(
      notif.userId,
      notif.inbox
    );
    return instance;
  }
  
  create() {
    this.apply(new NotificationCreatedEvent(this.toJSON()));   
  }


  toJSON(): INotification {
    return {
      userId: this.userId,
      inbox:this.inbox,
    };
  }

   sendNotification(inbox: IInbox) {
   
    
      this.inbox?.push(inbox);
      this.apply(new NotificationSentEvent(this.toJSON()));
  }

  deleteNotification(userId: string, inboxId:number) {
    this.userId = userId;
    if(!this.inbox) return;
    if(!this.inbox[inboxId]) return;
    const inbox = this.inbox[inboxId];
    const index = this.inbox.indexOf(inbox, 0);
    if (index > -1) {
      this.inbox.splice(index, 1);
    }
    this.apply(new NotificationDeletedEvent(this.toJSON()));
  }

  clearNotifications(userId: string) {
    this.userId=userId;
    this.inbox=[];
    this.apply(new NotificationsClearedEvent(this.toJSON()));
}
}
