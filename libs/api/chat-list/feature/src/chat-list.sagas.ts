import { ProfileCreatedEvent } from "@mp/api/profiles/util";
import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { map, Observable } from 'rxjs';
import { CreateChatListCommand } from "@mp/api/chat-list/util";

@Injectable()
export class ChatListSagas {
    // TESTING
    @Saga()
    onProfileCreated = (events$: Observable<any>): Observable<ICommand> => {
      return events$.pipe(
        ofType(ProfileCreatedEvent),
        map(
          (event: ProfileCreatedEvent) =>
            new CreateChatListCommand({ userId: event.profile.userId })
        )
      );
    };
}