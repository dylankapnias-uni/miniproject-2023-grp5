import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { 
  AddTimeCommand, 
  BlockUserCommand, 
  CreateSettingsCommand, 
  GetBlockedAccountsQuery, 
  GetVisibilityQuery, 
  IAddTimeRequest, 
  IAddTimeResponse, 
  IBlockUserRequest, 
  IBlockUserResponse, 
  ICreateSettingsRequest, 
  ICreateSettingsResponse, 
  IGetBlockedAccountsRequest, 
  IGetBlockedAccountsResponse, 
  IGetProfileVisibilityRequest, 
  IGetProfileVisibilityResponse, 
  IIsBlockedRequest, 
  IIsBlockedResponse, 
  ISubtractTimeRequest, 
  ISubtractTimeResponse, 
  IUnblockUserRequest, 
  IUnblockUserResponse, 
  IUpdatePrivacyRequest, 
  IUpdatePrivacyResponse, 
  IsBlockedQuery, 
  SubtractTimeCommand, 
  UnblockUserCommand, 
  UpdatePrivacyCommand 
} from "@mp/api/settings/util";

@Injectable()
export class SettingsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ){}

  async addTime(
    request: IAddTimeRequest
  ): Promise<IAddTimeResponse> {
    return await this.commandBus.execute<
      AddTimeCommand,
      IAddTimeResponse
    >(new AddTimeCommand(request));
  }

  async subtractTime(
    request: ISubtractTimeRequest
  ): Promise<ISubtractTimeResponse> {
    return await this.commandBus.execute<
      SubtractTimeCommand,
      ISubtractTimeResponse
    >(new SubtractTimeCommand(request));
  }

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
    >(new UnblockUserCommand(request));
  }

  async isBlocked(
    request: IIsBlockedRequest
  ): Promise<IIsBlockedResponse> {
    return await this.queryBus.execute<
      IsBlockedQuery, 
      IIsBlockedResponse
    >(new IsBlockedQuery(request));
  }

  async getBlockedAccounts(
    request: IGetBlockedAccountsRequest
  ): Promise<IGetBlockedAccountsResponse> {
    return await this.queryBus.execute<
      GetBlockedAccountsQuery,
      IGetBlockedAccountsResponse
    >(new GetBlockedAccountsQuery(request));
  }

  async updatePrivacy(
    request: IUpdatePrivacyRequest
  ): Promise<IUpdatePrivacyResponse> {
    return await this.commandBus.execute<
      UpdatePrivacyCommand,
      IUpdatePrivacyResponse
    >(new UpdatePrivacyCommand(request));
  }

  async getVisibility(
    request: IGetProfileVisibilityRequest
  ): Promise<IGetProfileVisibilityResponse> {
    return await this.queryBus.execute<
      GetVisibilityQuery,
      IGetProfileVisibilityResponse
    >(new GetVisibilityQuery(request));
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