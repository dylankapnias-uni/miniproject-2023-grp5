import { IPost, IUserProfile } from '@mp/api/users/util';
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

  async getUserProfile(userId: string) {
    return await admin
      .firestore()
      .collection('User_Profile')
      .doc(userId)
      .withConverter<IUserProfile>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IUserProfile;
        },
        toFirestore: (it: IUserProfile) => it,
      })
      .get()
      .catch((err) => {
        console.log(`Error while retrieving User Profile document from Firestore for user ${userId}:`);
        console.log(err);
        return null;
      });
  }

  async updateUserProfile(userProfile: IUserProfile) {
    return await admin
      .firestore()
      .collection('User_Profile')
      .doc(userProfile.userId)
      .set(userProfile);
  }

  async deleteUserProfileCommand(userId: string) {
    return await admin
      .firestore()
      .collection('User_Profile')
      .doc(userId)
      .delete();
  }

  async uploadImage(userId: string, post: IPost) {
    return "hello, world"; // TODO
  }
}
