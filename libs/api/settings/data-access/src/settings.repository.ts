import { ISettings, ITime } from '@mp/api/settings/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FieldValue, Timestamp, WriteResult } from 'firebase-admin/firestore';
@Injectable()
export class SettingsRepository {

  async findOne(userId: string) {
    return await admin
      .firestore()
      .collection('Settings')
      .withConverter<ISettings>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as ISettings;
        },
        toFirestore: (it: ISettings) => it,
      })
      .doc(userId)
      .get();
  }

  async getTime(userId: string){
    const settingsRef = await admin
      .firestore()
      .collection('Settings')
      .withConverter<ISettings>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as ISettings;
        },
        toFirestore: (it: ISettings) => it,
      })
      .doc(userId)
      .get();
    const settingsDoc = settingsRef.data();
    if (settingsDoc === undefined) {
      throw new Error(`getTime(): Settings data for user ${userId} does not exist`);
    }
    console.log("getTime");
    console.log(JSON.stringify(settingsDoc))
    return settingsDoc.time;
  }

  async createSettings(settings: ISettings) {
    return await admin
      .firestore()
      .collection('Settings')
      .doc(settings.userId)
      .create(settings);
  }

  async addTime(userId: string, data: {amount: number, date: Timestamp}) {
    return await admin
      .firestore()
      .collection('Settings')
      .doc(userId)
      .update({
        'time.remaining': FieldValue.increment(data.amount),
        'time.history': FieldValue.arrayUnion(data)
      })
      .catch((error) => {console.log(`Error while adding time to ${userId}: ${error}`)});
  }
  // TODO subtract time

  // TODO block user

  // TODO unblock user

  // TODO change visibility
}
