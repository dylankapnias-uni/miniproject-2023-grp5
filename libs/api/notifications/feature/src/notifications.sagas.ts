import { ProfileCreatedEvent } from "@mp/api/profiles/util";
import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { map, Observable } from 'rxjs';
import { NotificationRepository } from "@mp/api/notifications/data-access";
import { CreateNotificationCommand, NotificationCreatedEvent } from "@mp/api/notifications/util";
@Injectable()
export class NotificationsSagas {
    // TESTING
    @Saga()
    onNotificationCreated = (events$: Observable<any>): Observable<ICommand> => {

      return events$.pipe(
        ofType(ProfileCreatedEvent),
        map(
          (event: ProfileCreatedEvent) =>
            new CreateNotificationCommand({ userId: event.profile.userId})
        )
      );
    };
}