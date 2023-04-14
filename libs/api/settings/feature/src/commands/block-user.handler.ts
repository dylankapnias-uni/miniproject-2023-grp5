import { SettingsRepository } from "@mp/api/settings/data-access";
import { BlockUserCommand } from "@mp/api/settings/util";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Settings } from "../models";
// TODO Add return
@CommandHandler(BlockUserCommand)
export class BlockUserHandler implements ICommandHandler<BlockUserCommand, any> {

  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: SettingsRepository
  ){}

  async execute(command: BlockUserCommand) {
    const request = command.request;
    const settingsDoc = await this.repository.findOne(request.userId);
    const settingsData = settingsDoc.data();

    if (settingsData === undefined) {
      throw new Error(`Settings data for user ${request.userId} does not exist`);
    }

    const settings = this.publisher.mergeObjectContext(Settings.fromData(settingsData));

    settings.blockUser(request.blockedUserId);
    settings.commit();

    // return response;
  }
}