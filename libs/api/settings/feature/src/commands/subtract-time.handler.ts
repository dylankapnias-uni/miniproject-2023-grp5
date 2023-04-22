import { SettingsRepository } from "@mp/api/settings/data-access";
import { 
  ISubtractTimeRequest,
  ISubtractTimeResponse,
  SubtractTimeCommand,
  ISettings,
  ITime
} from "@mp/api/settings/util";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Settings } from "../models";
import { Timestamp } from "firebase-admin/firestore";
// TODO Test return value
// TODO Clean up
@CommandHandler(SubtractTimeCommand)
export class SubtractTimeHandler implements 
ICommandHandler<SubtractTimeCommand, ISubtractTimeResponse> {

  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: SettingsRepository
  ){}

  async execute(command: SubtractTimeCommand) {
    const request = {
      userId: command.request.userId,
      data: {
        amount: -command.request.amount,
        date: Timestamp.fromDate(new Date())
      }};
    const settingsDoc = await this.repository.findOne(request.userId);
    const settingsData = settingsDoc.data();

    if (settingsData === undefined) {
      throw new Error(`Settings data for user ${request.userId} does not exist`);
    }

    const settings = this.publisher.mergeObjectContext(Settings.fromData(settingsData));

    // TODO check if enough time remains before subtracting
    settings.subtractTime(request.data);
    settings.commit();
    const result: ITime = {
      remaining: settings.time.remaining + request.data.amount,
      history: settings.time.history
    };

    result.history.push(request.data);
    // TODO FIX THIS, FIND WAY TO UPDATE MODEL WITHOUT BREAKING FIRESTORE UPDATE
    const response: ISubtractTimeResponse = {userId: request.userId, time: result};
    console.log(`SubtractTimeHandler: \n${JSON.stringify(response)}`);
    return response;
  }
}