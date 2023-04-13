import { ProfileCreatedEvent } from "@mp/api/profiles/util";
import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { map, Observable } from 'rxjs';
import { CreateSettingsCommand } from "@mp/api/settings/util";

@Injectable()
export class SettingsSagas {
    // TESTING
    @Saga()
    onProfileCreated = (events$: Observable<any>): Observable<ICommand> => {
      return events$.pipe(
        ofType(ProfileCreatedEvent),
        map(
          (event: ProfileCreatedEvent) =>
            new CreateSettingsCommand({ userId: event.profile.userId })
        )
      );
    };
  
}