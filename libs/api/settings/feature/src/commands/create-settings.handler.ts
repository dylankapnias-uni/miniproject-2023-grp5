import { 
  CreateSettingsCommand,
  ICreateSettingsResponse,
  ISettings,
  ProfilePrivacy
} from '@mp/api/settings/util';
import {
  CommandHandler,
  EventPublisher,
  ICommandHandler
} from '@nestjs/cqrs';
import { Settings } from '../models';
// TODO Clean up
@CommandHandler(CreateSettingsCommand)
export class CreateSettingsHandler
implements ICommandHandler<
  CreateSettingsCommand,
  ICreateSettingsResponse
> {
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
      remaining: 0,
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
    return {settings: settings.toJSON()};
  }
}
