import { Module } from '@nestjs/common';
import { SettingsRepository } from './settings.repository';

@Module({
  providers: [SettingsRepository],
  exports: [SettingsRepository],
})
export class SettingsModule {}
