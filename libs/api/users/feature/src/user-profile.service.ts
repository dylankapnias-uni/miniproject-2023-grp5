import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { 
  IUserProfile,
  CreateMockUserCommand,
  IGetUserProfileRequest, 
  IUpdateUserProfileRequest,
  IDeleteUserProfileRequest, 
  ICreateUserRequest,
  IGetUserProfileResponse, 
  IUpdateUserProfileResponse,
  IDeleteUserProfileResponse, 
  ICreateUserResponse,
  GetUserProfileQuery,
  UpdateUserProfileCommand, 
  DeleteUserProfileCommand, 
  CreateUserCommand,
  IGetUserProfileListRequest,
  IGetUserProfileListResponse,
  GetUserProfileListQuery,
} from '@mp/api/users/util';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async getUserProfile(
    request: IGetUserProfileRequest
  ): Promise<IGetUserProfileResponse> {
    return await this.queryBus.execute<
      GetUserProfileQuery,
      IGetUserProfileResponse
    >(new GetUserProfileQuery(request));
  }
  
  async getUserProfileList(
    request: IGetUserProfileListRequest
  ): Promise<IGetUserProfileListResponse> {
    return await this.queryBus.execute<
      GetUserProfileListQuery,
      IGetUserProfileListResponse
    >(new GetUserProfileListQuery(request));
  }

  async updateUserProfile(
    request: IUpdateUserProfileRequest
  ): Promise<IUpdateUserProfileResponse> {
    return await this.commandBus.execute<
      UpdateUserProfileCommand,
      IUpdateUserProfileResponse
    >(new UpdateUserProfileCommand(request));
  }

  async deleteUserProfile(
    request: IDeleteUserProfileRequest
  ): Promise<IDeleteUserProfileResponse> {
    return await this.commandBus.execute<
      DeleteUserProfileCommand,
      IDeleteUserProfileResponse
    >(new DeleteUserProfileCommand(request));
  }

  // TODO Remove after testing
  async createUserProfile(
    request: ICreateUserRequest
  ): Promise<ICreateUserResponse> {
    return await this.commandBus.execute<
      CreateUserCommand, 
      ICreateUserResponse
    >(new CreateUserCommand(request));
  }

  async createMockUser(
    request: IUserProfile
  ): Promise<IUserProfile> {
    return await this.commandBus.execute<
      CreateMockUserCommand, 
      IUserProfile
    >(new CreateMockUserCommand(request));
  }
}
