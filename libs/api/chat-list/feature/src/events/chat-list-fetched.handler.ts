import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ChatListFetchedEvent } from "@mp/api/chat-list/util";

@EventsHandler(ChatListFetchedEvent)
export class ChatListFetchedHandler 
    implements IEventHandler<ChatListFetchedEvent> {
    handle(event: ChatListFetchedEvent) {
        console.log(`${ChatListFetchedHandler.name}`);
    }
}