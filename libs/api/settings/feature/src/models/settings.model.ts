import {
  // Events
  SettingsCreatedEvent,
  // Interfaces
  ISettings,
  ITime,
  IPrivacyDetails,
  // Enums
  ProfilePrivacy
} from '@mp/api/settings/util';
import { AggregateRoot } from '@nestjs/cqrs';

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

  toJSON(): ISettings {
    return {
      userId: this.userId,
      privacy: this.privacy,
      time: this.time
    };
  }
}
