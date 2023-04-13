import { SettingsModule as SettingsDataAccessModule } from '@mp/api/settings/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  //command handlers
  CreateSettingsHandler
} from './commands';
import { 
  //event handlers
  SettingsCreatedHandler
} from './events';
import { SettingsSagas } from './settings.sagas';
import { SettingsService } from './settings.service'

export const CommandHandlers = [
  CreateSettingsHandler
];

export const EventHandlers = [
  SettingsCreatedHandler
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