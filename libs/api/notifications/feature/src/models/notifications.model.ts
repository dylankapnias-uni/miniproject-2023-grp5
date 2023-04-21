import { IInbox, INotification, NotificationSentEvent,NotificationDeletedEvent } from '@mp/api/notifications/util';

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
//to do: Create Needs to be implemented
  create() {
    // this.apply(new NotificationCreatedEvent(this.toJSON()));   
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

  deleteNotification(userId: string) {
    this.userId = userId;
    this.inbox=[];
    this.apply(new NotificationDeletedEvent(this.toJSON()));
}
}
