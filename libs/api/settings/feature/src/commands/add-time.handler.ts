import { SettingsRepository } from "@mp/api/settings/data-access";
import { 
  IAddTimeRequest,
  IAddTimeResponse,
  AddTimeCommand,
  ISettings,
  ITime
} from "@mp/api/settings/util";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Settings } from "../models";
// TODO Test return value
@CommandHandler(AddTimeCommand)
export class AddTimeHandler implements ICommandHandler<AddTimeCommand, IAddTimeResponse> {

  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: SettingsRepository
  ){}

  async execute(command: AddTimeCommand) {
    const request = command.request;
    const settingsDoc = await this.repository.findOne(request.userId);
    const settingsData = settingsDoc.data();

    if (settingsData === undefined) {
      throw new Error(`Settings data for user ${request.userId} does not exist`);
    }

    const settings = this.publisher.mergeObjectContext(Settings.fromData(settingsData));

    settings.addTime(request.purchase);
    settings.commit();

    const result: ITime = {
      remaining: settings.time.remaining + request.purchase.amount,
      history: settings.time.history
    };

    result.history.push(request.purchase);
    const response: IAddTimeResponse = {userId: request.userId, time: result};
    console.log(`AddTimeHandler: \n${response}`);
    return response;
  }
}