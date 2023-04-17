import { SettingsModule as SettingsDataAccessModule } from '@mp/api/settings/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  //command handlers
  CreateSettingsHandler,
  AddTimeHandler,
  UpdatePrivacyHandler
} from './commands';
import { 
  //event handlers
  SettingsCreatedHandler,
  TimeAddedHandler,
  PrivacyUpdatedHandler
} from './events';
import { SettingsSagas } from './settings.sagas';
import { SettingsService } from './settings.service'

export const CommandHandlers = [
  CreateSettingsHandler,
  AddTimeHandler,
  UpdatePrivacyHandler
];

export const EventHandlers = [
  SettingsCreatedHandler,
  TimeAddedHandler,
  PrivacyUpdatedHandler
]

@Module({
  imports: [CqrsModule, SettingsDataAccessModule],
  providers: [
    SettingsService,
    ...CommandHandlers,
    ...EventHandlers,
    SettingsSagas
  ],
  exports: [SettingsService]
})
export class SettingsModule{}