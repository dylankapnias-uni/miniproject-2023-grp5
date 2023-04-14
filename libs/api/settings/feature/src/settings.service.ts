import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AddTimeCommand, BlockUserCommand, IAddTimeRequest, IAddTimeResponse, IBlockUserRequest, IUnblockUserRequest, IUpdatePrivacyRequest, UnblockUserCommand, UpdatePrivacyCommand } from "@mp/api/settings/util";

@Injectable()
export class SettingsService {
  constructor(private readonly commandBus: CommandBus){}

  async addTime(
    request: IAddTimeRequest
  ): Promise<IAddTimeResponse> {
    return await this.commandBus.execute<
      AddTimeCommand,
      IAddTimeResponse
    >(new AddTimeCommand(request));
  }
  // TODO implement responses

  async blockUser(
    request: IBlockUserRequest
  ): Promise<any> {
    return await this.commandBus.execute<
      BlockUserCommand,
      any
    >(new BlockUserCommand(request));
  }

  async unblockUser(
    request: IUnblockUserRequest
  ): Promise<any> {
    return await this.commandBus.execute<
      UnblockUserCommand,
      any
    >(new BlockUserCommand(request));
  }

  async updatePrivacy(
    request: IUpdatePrivacyRequest
  ): Promise<any> {
    return await this.commandBus.execute<
      UpdatePrivacyCommand,
      any
    >(new UpdatePrivacyCommand(request));
  }
}