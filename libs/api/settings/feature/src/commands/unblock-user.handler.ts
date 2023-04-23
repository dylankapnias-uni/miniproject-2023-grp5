import { SettingsRepository } from "@mp/api/settings/data-access";
import { IUnblockUserResponse, UnblockUserCommand } from "@mp/api/settings/util";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Settings } from "../models";

@CommandHandler(UnblockUserCommand)
export class UnblockUserHandler 
implements ICommandHandler<UnblockUserCommand, IUnblockUserResponse> {

  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: SettingsRepository
  ){}

  async execute(command: UnblockUserCommand) {
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
    // if user not blocked
    if (!blockedUsers.includes(request.blockedUserId)) {
      return { userId: request.userId, blockedAccounts: blockedUsers};
    }
    // Remove blockedUserId from blockedUsers array
    blockedUsers.splice(blockedUsers.indexOf(request.blockedUserId), 1);
    
    // create settings model that can dispatch events
    const settings = this.publisher.mergeObjectContext(Settings.fromData(settingsData));

    settings.unblockUser(request.blockedUserId);
    settings.commit();

    
    // return response;
    return { userId: settings.userId, blockedAccounts: blockedUsers };
  }
}