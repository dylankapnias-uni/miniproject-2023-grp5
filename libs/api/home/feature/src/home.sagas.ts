import { ProfileCreatedEvent } from "@mp/api/profiles/util";
import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { map, Observable } from 'rxjs';
import { CreateUserHomeCommand } from "@mp/api/home/util";

@Injectable()
export class HomeSagas {
    // TESTING
    @Saga()
    onProfileCreated = (events$: Observable<any>): Observable<ICommand> => {
      return events$.pipe(
        ofType(ProfileCreatedEvent),
        map(
          (event: ProfileCreatedEvent) =>
            new CreateUserHomeCommand({ userId: event.profile.userId })
        )
      );
    };
}