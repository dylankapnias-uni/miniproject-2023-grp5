import { 
  CreateSettingsCommand,
  ISettings,
  IPrivacyDetails,
  ProfilePrivacy,
  ITime,
  IAddTimeResponse,
  IAddTimeRequest
} from '@mp/api/settings/util';
import {
  CommandHandler,
  EventPublisher,
  ICommandHandler
} from '@nestjs/cqrs';
import { Settings } from '../models';
import { Timestamp } from 'firebase-admin/firestore';
import { SettingsRepository } from '@mp/api/settings/data-access';

@CommandHandler(CreateSettingsCommand)
export class CreateSettingsHandler
implements ICommandHandler<CreateSettingsCommand> {
  constructor(private publisher: EventPublisher, private readonly repository: SettingsRepository){}

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
      // remaining: 1000,
      remaining: 0,
      // history: [{amount:1000, date:Timestamp.fromDate(new Date())}]
      history: []
    };

    const data: ISettings = {
      userId: userId,
      privacy: privacy,
      time: time
    };
    
    const settings = this.publisher.mergeObjectContext(Settings.fromData(data));
    // Add settings to firestore
    settings.create();
    // commit events in order for them to be dispatched
    settings.commit();

    
    // So, idk why, but the code below has influence on the updated values in firestore
    // Like, the events are applied and commited in lines 50-52, but somehow this completely
    // unrelated variable mess it up
    // const result: ITime = {
    //   remaining: settings.time.remaining + 10000,
    //   history: settings.time.history
    // };

    // result.history.push({amount:10000, date:Timestamp.fromDate(new Date())});
    // const response: IAddTimeResponse = {userId: req.userId, time: result};
    // console.log(`CreateSettingsHandler: \n${JSON.stringify(response)}`);
  }
}
