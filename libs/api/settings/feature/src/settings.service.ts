import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { 
  AddTimeCommand, 
  BlockUserCommand, 
  CreateSettingsCommand, 
  IAddTimeRequest, 
  IAddTimeResponse, 
  IBlockUserRequest, 
  IBlockUserResponse, 
  ICreateSettingsRequest, 
  ICreateSettingsResponse, 
  IUnblockUserRequest, 
  IUnblockUserResponse, 
  IUpdatePrivacyRequest, 
  IUpdatePrivacyResponse, 
  UnblockUserCommand, 
  UpdatePrivacyCommand 
} from "@mp/api/settings/util";

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
  ): Promise<IBlockUserResponse> {
    return await this.commandBus.execute<
      BlockUserCommand,
      IBlockUserResponse
    >(new BlockUserCommand(request));
  }

  async unblockUser(
    request: IUnblockUserRequest
  ): Promise<IUnblockUserResponse> {
    return await this.commandBus.execute<
      UnblockUserCommand,
      IUnblockUserResponse
    >(new BlockUserCommand(request));
  }

  async updatePrivacy(
    request: IUpdatePrivacyRequest
  ): Promise<IUpdatePrivacyResponse> {
    return await this.commandBus.execute<
      UpdatePrivacyCommand,
      IUpdatePrivacyResponse
    >(new UpdatePrivacyCommand(request));
  }

  async createSettings(
    request: ICreateSettingsRequest
  ): Promise<ICreateSettingsResponse> {
    return await this.commandBus.execute<
      CreateSettingsCommand,
      ICreateSettingsResponse
    >(new CreateSettingsCommand(request));
  }
}