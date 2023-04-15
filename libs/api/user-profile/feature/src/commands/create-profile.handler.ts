import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateProfileCommand)
export class CreateProfileCommand {

}