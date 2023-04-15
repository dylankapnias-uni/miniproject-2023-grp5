import { Injectable } from '@nestjs/common';
import { IHome } from '@mp/api/home/util';
import * as admin from 'firebase-admin';
import { DocumentReference } from 'firebase-admin/firestore';
@Injectable()
export class HomeRepository {
    async getList(userID: string) {
        var swiped = await (await admin
            .firestore()
            .collection('Home')
            .withConverter<IHome>({
                fromFirestore: (snapshot) => {
                    return snapshot.data() as IHome;
                },
                toFirestore: (it: IHome) => it,
            })
            .doc(userID)
            .get()).data() as IHome;
        if(swiped.userList==null||swiped.userList==undefined){
            swiped.userList = [];
            
            for(var i=0;i<10;i++){
                
                var allDocs=(await admin.firestore().collection('User_Profile').get()).docs;
                var usersLength = allDocs.length;
                var random = Math.floor(Math.random() * usersLength);
                var randomDoc = allDocs[random];
                var randomDocData = randomDoc;
            }
        }
        else if(swiped.userList.length > 10){
            var front = swiped.userList.slice(0, 10);
            var back = swiped.userList.slice(10, swiped.userList.length);
            admin
            .firestore()
            .collection('Home')
            .doc(userID)
            .set(back, { merge: false });
            return front;
        }else{

        }
        
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

      async getDocs() {
        const snapshot = await admin.firestore().collection('User_Profile').get()
        return snapshot.docs.map(doc => doc.data());
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