import { IBlockedAccounts, ISettings, ITime, ProfilePrivacy } from '@mp/api/settings/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FieldValue, Timestamp, WriteResult } from 'firebase-admin/firestore';
@Injectable()
export class SettingsRepository {
  async findOne(userId: string) {

    if(userId != null && userId != undefined && userId.length > 0){
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
    else{
      throw new Error(`findOne(): Settings data for user ${userId} does not exist`);
    }
  }
  async getBlockedAccounts(userId: string) {
    const settingsRef = await admin
      .firestore()
      .collection('Blocked_Account')
      .withConverter<IBlockedAccounts>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IBlockedAccounts;
        },
        toFirestore: (it: IBlockedAccounts) => it,
      })
      .doc(userId)
      .get();
    const settingsDoc = settingsRef.data();
    if (settingsDoc === undefined) {
      throw new Error(`getBlockedAccounts(): Settings data for user ${userId} does not exist`);
    }
    return settingsDoc.blocked;
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
      throw new Error(`getTime(): Array of blocked users for user ${userId} does not exist`);
    }
    console.log("getTime");
    console.log(JSON.stringify(settingsDoc))
    return settingsDoc.time;
  }

  async createSettings(settings: ISettings) {
    await admin
      .firestore()
      .collection('Settings')
      .doc(settings.userId)
      .create(settings);

    return await admin
      .firestore()
      .collection('Blocked_Account')
      .doc(settings.userId)
      .create({blocked: []});
  }

  async addTime(userId: string, data: {amount: number, date: Timestamp}) {
    await admin
      .firestore()
      .collection('Settings')
      .doc(userId)
      .update({
        'time.remaining': FieldValue.increment(data.amount),
        'time.history': FieldValue.arrayUnion(data)
      })
      .catch((error) => {console.log(`Error while adding time to ${userId}: ${error}`)});

      return await admin
        .firestore()
        .collection('User_Profile')
        .doc(userId)
        .update({
          'time': FieldValue.increment(data.amount)
        })
  }

  async subtractTime(userId: string, time: {amount: number, date: Timestamp}) {

    if(userId == null || userId == undefined || userId.length == 0) {
      throw new Error(`subtractTime(): userId is null or undefined or empty`);
    }
    await admin
    .firestore()
    .collection('Settings')
    .doc(userId)
    .update({
      'time.remaining': FieldValue.increment(time.amount),
      'time.history': FieldValue.arrayUnion(time)
    })
    .catch((error) => {console.log(`Error while subtracting time from ${userId}: ${error}`)})

    return await admin
      .firestore()
      .collection('User_Profile')
      .doc(userId)
      .update({
        'time': FieldValue.increment(time.amount)
      })
  }
  async blockUser(userId: string, blockedId: string) {
    return await admin
      .firestore()
      .collection('Blocked_Account')
      .doc(userId)
      .update({
        'blocked': FieldValue.arrayUnion(blockedId)
      })
      .catch((error) => {
        console.log(
          `Error while adding user ${blockedId} to blocked account list of user ${userId}: ${error}`
          )
        }
      );
  }

  async unblockUser(userId: string, blockedId: string) {
    return await admin
      .firestore()
      .collection('Blocked_Account')
      .doc(userId)
      .update({
        'blocked': FieldValue.arrayRemove(blockedId)
      })
      .catch((error) => {
        console.log(
          `Error while removing user ${blockedId} from blocked account list of user ${userId}: ${error}`
          )
        }
      );
  }

  async updatePrivacy(userId: string, profileVisibility: ProfilePrivacy) {
    return await admin
      .firestore()
      .collection('Settings')
      .doc(userId)
      .update({
        'privacy.profileVisibility': profileVisibility
      })
      .catch((error) => {
        console.log(
          `Error while setting profile visibility of user ${userId} to ${profileVisibility}: ${error}`
          )
        }
      );
  }
}
