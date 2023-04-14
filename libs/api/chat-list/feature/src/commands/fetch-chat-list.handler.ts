import { FetchChatListCommand } from "@mp/api/chat-list/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { Timestamp } from 'firebase-admin/firestore';

@CommandHandler(FetchChatListCommand)
export class FetchChatListHandler
    implements ICommandHandler<FetchChatListCommand>{
    constructor(private publisher: EventPublisher, private firestore: FirebaseFirestore) {}
    
    async execute(command: FetchChatListCommand) {
        console.log(`${FetchChatListHandler.name}`);
    }
}