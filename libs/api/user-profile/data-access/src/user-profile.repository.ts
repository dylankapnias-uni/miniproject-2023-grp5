import { IProfile } from '@mp/api/user-profile/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class ProfileRepository {
    async getUserByID(profile: IProfile) {
        return await admin
          .firestore()
          .collection('User_Profile')
          .withConverter<IProfile>({
            fromFirestore: (snapshot) => {
              return snapshot.data() as IProfile;
            },
            toFirestore: (it: IProfile) => it,
          })
          .doc(profile.userId)
          .get();
      }
    
      async createProfile(profile: IProfile) {
        // Remove password field if present
        delete profile.accountDetails?.password;
        return await admin
          .firestore()
          .collection('User_Profile')
          .doc(profile.userId)
          .create(profile);
      }
    
      async updateProfile(profile: IProfile) {
        // Remove password field if present
        delete profile.accountDetails?.password;
        return await admin
          .firestore()
          .collection('User_Profile')
          .doc(profile.userId)
          .set(profile, { merge: true });
      }
}