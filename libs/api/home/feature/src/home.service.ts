
import { AcceptUserCommand, IAcceptUserRequest, IAcceptUserResponse } from '@mp/api/home/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class HomeService {
  constructor(private readonly commandBus: CommandBus) {}

  async acceptUser(
    request: IAcceptUserRequest
  ): Promise<IAcceptUserResponse> {
    return await this.commandBus.execute<
      AcceptUserCommand,
      IAcceptUserResponse
    >(new AcceptUserCommand(request));
  }

}
