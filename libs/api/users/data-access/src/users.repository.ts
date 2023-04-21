import { IUserProfile } from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class UserProfileRepository {
  async createUserProfile(user: IUserProfile) {
    return await admin
      .firestore()
      .collection('User_Profile')
      .doc(user.userId)
      .create(user);
  }
}
