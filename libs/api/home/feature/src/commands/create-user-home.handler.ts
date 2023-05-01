
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserHomeCommand, ICreateUserHomeResponse, IParsingData, IUserRef } from '@mp/api/home/util';
import { Home } from '../models';
import { HomeRepository } from '@mp/api/home/data-access';

@CommandHandler(CreateUserHomeCommand)
export class CreateUserHomeHandler
  implements ICommandHandler<CreateUserHomeCommand, ICreateUserHomeResponse>
{
  constructor(private publisher: EventPublisher, private readonly repository:HomeRepository) {}

  async execute(command: CreateUserHomeCommand) {
    console.log(`${CreateUserHomeHandler.name}`);

    const request = command.request;
    const userId = request.userId;
    
    const data: IParsingData={userId:userId, userRef:{userId:userId,accepted:[], visited:[userId]}};
    const home = this.publisher.mergeObjectContext(Home.fromData(data));

    home.create();
    home.commit();

    const response: ICreateUserHomeResponse ={home:home} as ICreateUserHomeResponse;
    
    return response;
  }
}
