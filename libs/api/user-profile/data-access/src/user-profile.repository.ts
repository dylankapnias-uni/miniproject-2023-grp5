import { IUserProfile } from '@mp/api/user-profile/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ProfileRepository 
{
    async getUserByID(userID: string) {
        return await admin
          .firestore()
          .collection('User_Profile')
          .withConverter<IUserProfile>({
            fromFirestore: (snapshot) => {
              return snapshot.data() as IUserProfile;
            },
            toFirestore: (it: IUserProfile) => it,
          })
          .doc(userID)
          .get();
      }
    
      async createProfile(userID : string, profile: IUserProfile) {
        return await admin
          .firestore()
          .collection('User_Profile')
          .doc(userID)
          .create(profile);
      }
    
      async updateProfile(userID:string, profile: IUserProfile) {
        return await admin
          .firestore()
          .collection('User_Profile')
          .doc(userID)
          .set(profile, { merge: true });
      }

      async uploadFile(filePath : string, userID : string, fileName : string): Promise<string> 
      {
        const storagePath = userID + "/" + fileName;

        admin.storage().bucket().upload(filePath, { destination:  storagePath})
        .then(data => {
          console.log('upload successful');
        })
        .catch(err => {
          console.log('upload failed');
        });

        return storagePath;
      }

      async downloadFile(storagePath : string, filePath : string): Promise<string>
      {
        admin.storage().bucket().file(filePath).download({destination: storagePath})
        .then(data => {
          console.log('download successful');
        }
        )
        .catch(err => {
          console.log('download failed');
        });
        
        return filePath;
      }
}