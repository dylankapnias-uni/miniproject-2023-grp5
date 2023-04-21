import { ProfileCreatedEvent } from "@mp/api/profiles/util";
import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { map, Observable } from 'rxjs';
import { CreateSettingsCommand, SettingsCreatedEvent } from "@mp/api/settings/util";
import { NotificationRepository } from "@mp/api/notifications/data-access";
@Injectable()
export class NotificationsSagas {
    // TESTING
    // @Saga()
    // onProfileCreated = (events$: Observable<any>): Observable<ICommand> => {
    //   return events$.pipe(
    //     ofType(SettingsCreatedEvent),
    //     map(
    //       (event: SettingsCreatedEvent) =>
    //         new CreateSettingsCommand({ userId: event.profile.userId })
    //     )
    //   );
    // };
}