import { SettingsRepository } from "@mp/api/settings/data-access";
import { IUpdatePrivacyResponse, UpdatePrivacyCommand } from "@mp/api/settings/util";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Settings } from "../models";
// TODO Add return
@CommandHandler(UpdatePrivacyCommand)
export class UpdatePrivacyHandler 
implements ICommandHandler<UpdatePrivacyCommand, IUpdatePrivacyResponse> {

  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: SettingsRepository
  ){}

  async execute(command: UpdatePrivacyCommand) {
    const request = command.request;
    const settingsDoc = await this.repository.findOne(request.userId);
    const settingsData = settingsDoc.data();

    if (settingsData === undefined) {
      throw new Error(`Settings data for user ${request.userId} does not exist`);
    }

    const settings = this.publisher.mergeObjectContext(Settings.fromData(settingsData));

    settings.updatePrivacy(request.profileVisibility);
    settings.commit();

    // return response;
    return {userId: settings.userId, privacy: settings.privacy.profileVisibility};
  }
}