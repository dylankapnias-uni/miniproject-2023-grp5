import { ISettings } from '@mp/api/settings/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class SettingsRepository {
  //TODO add functionality
  async createSettings(settings: ISettings) {
    return await admin
      .firestore()
      .collection('Settings')
      .doc(settings.userId)
      .create(settings);
  }
}
