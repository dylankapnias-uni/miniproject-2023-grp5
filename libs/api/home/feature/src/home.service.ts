
import { 
  AcceptUserCommand,
  CreateUserHomeCommand, 
  IAcceptUserRequest, 
  IAcceptUserResponse, 
  ICreateUserHomeRequest, 
  ICreateUserHomeResponse, 
  IRejectUserRequest, 
  IRejectUserResponse, 
  IRetrieveHomeUsersRequest, 
  IRetrieveHomeUsersResponse, 
  RejectUserCommand, 
  RetrieveHomeUsersQuery 
} from '@mp/api/home/util';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class HomeService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async createUserHome(
    request: ICreateUserHomeRequest
  ): Promise<ICreateUserHomeResponse> {
    return await this.commandBus.execute<
      CreateUserHomeCommand,
      ICreateUserHomeResponse
    >(new CreateUserHomeCommand(request));
  }

  

  async acceptUser(
    request: IAcceptUserRequest
  ): Promise<IAcceptUserResponse> {
    return await this.commandBus.execute<
      AcceptUserCommand,
      IAcceptUserResponse
    >(new AcceptUserCommand(request));
  }

  async rejectUser(
    request: IRejectUserRequest
  ): Promise<IRejectUserResponse> {
    return await this.commandBus.execute<
      RejectUserCommand,
      IRejectUserResponse
    >(new RejectUserCommand(request));
  }

  async fetchUsers(
    request: IRetrieveHomeUsersRequest
  ): Promise<IRetrieveHomeUsersResponse> {
    return await this.queryBus.execute<
      RetrieveHomeUsersQuery,
      IRetrieveHomeUsersResponse
    >(new RetrieveHomeUsersQuery(request));
  }

}
