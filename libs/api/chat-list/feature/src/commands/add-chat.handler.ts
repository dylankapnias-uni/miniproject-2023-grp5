import { AddChatCommand } from "@mp/api/chat-list/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';

@CommandHandler(AddChatCommand)
export class AddChatHandler
    implements ICommandHandler<AddChatCommand>{
    constructor(private publisher: EventPublisher) {}
    
    async execute(command: AddChatCommand) {
        console.log(`${AddChatHandler.name}`);

        const request = command.request;
        //Get valid data from request
        //Then create an intrface(if it ever gets implemented??) with rquests data

        const chat = this.publisher.mergeObjectContext(request);
        chat.add();
        chat.commit();
    }
}