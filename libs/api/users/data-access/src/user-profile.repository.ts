import { IPost, IUserProfile } from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
@Injectable()
export class UserProfileRepository {
  async createUserProfile(user: IUserProfile) {
    return await admin
      .firestore()
      .collection('User_Profile')
      .doc(user.userId)
      .create(user)
      .catch((err) => { 
        console.log(`Error while creating User Profile document in Firestore for user ${user.userId}:`);
        console.log(err);
        return null;
      });
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
      .set(userProfile)
      .catch((err) => { 
        console.log(`Error while updating User Profile document in Firestore for user ${userProfile.userId}:`);
        console.log(err);
        return null;
      });;
  }

  async deleteUserProfile(userId: string) {
    return await admin
      .firestore()
      .collection('User_Profile')
      .doc(userId)
      .delete()
      .catch((err) => { 
        console.log(`Error while deleting User Profile document in Firestore for user ${userId}:`);
        console.log(err);
        return null;
      });
  }

  async uploadProfileImage(file: File, userId: string) 
  {
    const filePath = `${userId}/${file.name}`;
    const storage = getStorage();
    const fileRef = ref(storage, filePath);
    const task = uploadBytesResumable(fileRef, file);


    task.on('state_changed' ,(snapshot) => {
      console.log(snapshot);
    }, (error) => {
      console.log(error);
    }, () => {
      getDownloadURL(task.snapshot.ref).then(async downloadURL => {
        console.log(downloadURL);
        return downloadURL;
      })
    }
    )
  }

  async uploadPostImage(file: File, userId: string) 
  {
    const filePath = `${userId}/${file.name}`;
    const storage = getStorage();
    const fileRef = ref(storage, filePath);
    const task = uploadBytesResumable(fileRef, file);


    task.on('state_changed' ,(snapshot) => {
      console.log(snapshot);
    }, (error) => {
      console.log(error);
    }, () => {
      getDownloadURL(task.snapshot.ref).then(async downloadURL => {
        console.log(downloadURL);
        return downloadURL;
      })
    }
    )
  }
}
