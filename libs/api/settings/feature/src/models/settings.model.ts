import {
  // Events
  SettingsCreatedEvent,
  // Interfaces
  ISettings,
  ITime,
  IPrivacyDetails,
  // Enums
  ProfilePrivacy,
  TimeAddedEvent,
  PrivacyUpdatedEvent,
  UserBlockedEvent,
  UserUnblockedEvent,
  TimeSubtractedEvent
} from '@mp/api/settings/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';

export class Settings 
  extends AggregateRoot 
  implements ISettings 
{
  constructor(
    public userId: string,
    public privacy: IPrivacyDetails,
    public time: ITime
  ) {
    super();
  }

  static fromData(settings: ISettings): Settings {
    const instance = new Settings(
      settings.userId,
      settings.privacy,
      settings.time
    );
    return instance;
  }

  create() {
    this.apply(new SettingsCreatedEvent(this.toJSON()));
  }

  addTime(data:{amount:number,date:Timestamp}) {
    console.log("Settings.addTime()");
    console.log(JSON.stringify(data));
    this.apply(new TimeAddedEvent(this.userId, data));
  }

  subtractTime(data: {amount: number, date: Timestamp}) {
    // this.time.remaining -= data.amount;
    this.apply(new TimeSubtractedEvent(this.userId, data))
  }

  blockUser(blockedId: string) {
    // this.privacy.blockedAccounts.push(blockedId);

    this.apply(new UserBlockedEvent({userId: this.userId, blockedUserId: blockedId}));
  }

  unblockUser(blockedId: string) {
    // const index = this.privacy.blockedAccounts.indexOf(blockedId);
    // if (index == -1) return;
    // this.privacy.blockedAccounts.splice(index, 1);
    this.apply(new UserUnblockedEvent({userId: this.userId, blockedUserId: blockedId}));
  }

  updatePrivacy(visibility: ProfilePrivacy) {
    this.privacy.profileVisibility = visibility;
    this.apply(new PrivacyUpdatedEvent({userId: this.userId, profileVisibility: visibility}));
  }
  /* TODO
    Add queries to:

      get time, 
      get history, 
      get blocked users, 
      get profile visibility

  */

  toJSON(): ISettings {
    return {
      userId: this.userId,
      privacy: this.privacy,
      time: this.time
    };
  }
}
