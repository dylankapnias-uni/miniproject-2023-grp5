import { IUpdatePrivacyRequest } from '@mp/api/settings/util';
import { SettingsService } from '@mp/api/settings/feature';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const updateContactDetails = functions.https.onCall(
  async (
    request: IUpdatePrivacyRequest
  ): Promise<string> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SettingsService);
    return service.updatePrivacy(request);
  }
);