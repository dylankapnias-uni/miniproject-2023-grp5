import {
  // Events
  SettingsCreatedEvent,
  // Interfaces
  ISettings,
  ITime,
  IPrivacyDetails,
  // Enums
  ProfilePrivacy,
  TimeAddedEvent
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
    // TODO create event
    console.log("Settings.addTime()");
    console.log(JSON.stringify(data));
    this.apply(new TimeAddedEvent(this.userId, data));
  }

  subtractTime(amount: number) {
    this.time.remaining -= amount;
    // TODO create event
  }

  blockUser(blockedId: string) {
    this.privacy.blockedAccounts.push(blockedId);
    // TODO create event
  }

  unblockUser(blockedId: string) {
    const index = this.privacy.blockedAccounts.indexOf(blockedId);
    if (index == -1) return;
    this.privacy.blockedAccounts.splice(index, 1);
    // TODO create event
  }

  updatePrivacy(visibility: ProfilePrivacy) {
    this.privacy.profileVisibility = visibility;
    // TODO create event
  }
  /* TODO
    Add queries to:

      get time, 
      get history, 
      get blocked users, 
      check if user is blocked,
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
