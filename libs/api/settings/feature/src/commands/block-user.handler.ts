import { SettingsRepository } from "@mp/api/settings/data-access";
import { BlockUserCommand, IBlockUserResponse } from "@mp/api/settings/util";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Settings } from "../models";

@CommandHandler(BlockUserCommand)
export class BlockUserHandler 
implements ICommandHandler<BlockUserCommand, IBlockUserResponse> {

  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: SettingsRepository
  ){}

  async execute(command: BlockUserCommand) {
    // Get settings data
    const request = command.request;
    const settingsDoc = await this.repository.findOne(request.userId);
    const settingsData = settingsDoc.data();
    // check if settings data exists
    if (settingsData === undefined) {
      throw new Error(`Settings data for user ${request.userId} does not exist`);
    }
    // get array of blocked users
    const blockedUsers = await this.repository.getBlockedAccounts(request.userId);
    // if user already blocked
    if (blockedUsers.includes(request.blockedUserId)) {
      return { userId: request.userId, blockedAccounts: blockedUsers};
    }
    // Add blockedUserId to blockedUsers array
    blockedUsers.push(request.blockedUserId);

    // create settings model that can dispatch events
    const settings = this.publisher.mergeObjectContext(Settings.fromData(settingsData));

    settings.blockUser(request.blockedUserId);
    settings.commit();

    
    // return response;
    return { userId: settings.userId, blockedAccounts: blockedUsers };
  }
}