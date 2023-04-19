import { SettingsRepository } from "@mp/api/settings/data-access";
import { IUnblockUserResponse, UnblockUserCommand } from "@mp/api/settings/util";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Settings } from "../models";
// TODO Add return
@CommandHandler(UnblockUserCommand)
export class UnblockUserHandler 
implements ICommandHandler<UnblockUserCommand, IUnblockUserResponse> {

  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: SettingsRepository
  ){}

  async execute(command: UnblockUserCommand) {
    const request = command.request;
    const settingsDoc = await this.repository.findOne(request.userId);
    const settingsData = settingsDoc.data();

    if (settingsData === undefined) {
      throw new Error(`Settings data for user ${request.userId} does not exist`);
    }

    const settings = this.publisher.mergeObjectContext(Settings.fromData(settingsData));

    settings.unblockUser(request.blockedUserId);
    settings.commit();

    // return response;
    return { userId: settings.userId, blockedAccounts: settings.privacy.blockedAccounts };
  }
}