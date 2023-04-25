import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { 
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
  CreateUserCommand
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
}
