import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ChatAddedEvent } from "@mp/api/chat-list/util";

@EventsHandler(ChatAddedEvent)
export class ChatAddedHandler 
    implements IEventHandler<ChatAddedEvent> {
    handle(event: ChatAddedEvent) {
        console.log(`${ChatAddedHandler .name}`);
    }
}