import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteProfileCommand)
export class DeleteProfileCommand {

}