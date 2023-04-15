import { IProfile } from '@mp/api/user-profile/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import firebase from "firebase/app";
import "firebase/storage";

@Injectable()
export class ProfileRepository {
    async getUserByID(userID: string) {
        return await admin
          .firestore()
          .collection('User_Profile')
          .withConverter<IProfile>({
            fromFirestore: (snapshot) => {
              return snapshot.data() as IProfile;
            },
            toFirestore: (it: IProfile) => it,
          })
          .doc(userID)
          .get();
      }
    
      async createProfile(userID : string, profile: IProfile) {
        return await admin
          .firestore()
          .collection('User_Profile')
          .doc(userID)
          .create(profile);
      }
    
      async updateProfile(userID:string, profile: IProfile) {
        return await admin
          .firestore()
          .collection('User_Profile')
          .doc(userID)
          .set(profile, { merge: true });
      }

      /*async uploadFileAndGetDownloadURL(file: File): Promise<string> {
        // Get a reference to the file you want to upload
        const storageRef = admin.app().storage();
        const fileRef = storageRef.child("myFiles/" + file.name);
    
        // Upload the file to Firebase Storage
        const snapshot = await fileRef.put(file);
    
        // Get the download URL for the uploaded file
        const downloadURL = await snapshot.ref.getDownloadURL();
    
        // Return the download URL as a string
        return downloadURL;
      }*/
}