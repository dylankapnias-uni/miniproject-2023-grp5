import { 
  CreateSettingsCommand,
  ISettings,
  IPrivacyDetails,
  ProfilePrivacy,
  ITime
} from '@mp/api/settings/util';
import {
  CommandHandler,
  EventPublisher,
  ICommandHandler
} from '@nestjs/cqrs';
import { Settings } from '../models';
import { Timestamp } from 'firebase-admin/firestore';
@CommandHandler(CreateSettingsCommand)
export class CreateSettingsHandler
implements ICommandHandler<CreateSettingsCommand> {
  constructor(private publisher: EventPublisher){}

  async execute(command: CreateSettingsCommand) {
    console.log(`${CreateSettingsHandler.name}`);

    const req = command.request;
    const userId = req.userId;
    const privacy = {
      profileVisibility: ProfilePrivacy.EVERYONE,
      blockedAccounts: []
    };
    const time = {
      // DEFAULT TIME/HISTORY
      // TODO change how initial time is added
      remaining: 1000,
      history: [{amount:1000, date:Timestamp.fromDate(new Date())}]
    };

    const data: ISettings = {
      userId: userId,
      privacy: privacy,
      time: time
    };

    const settings = this.publisher.mergeObjectContext(Settings.fromData(data));
    // create method of Settings model
    settings.create();
    // commit events in order for them to be dispatched
    settings.commit();
      

  }
}
