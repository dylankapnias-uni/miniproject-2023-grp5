import { Injectable } from '@nestjs/common';
import { IHome, IMatched, IUserRef } from '@mp/api/home/util';
import * as admin from 'firebase-admin';
import { IProfile } from '@mp/api/user-profile/util';
@Injectable()
export class HomeRepository {
    async getUserList(userID: string) {
        const swiped =  (await admin
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
            const list=[];
            for(let i=0;i<10;i++){
                
                const allDocs=(await admin.firestore().collection('User_Profile').get()).docs;
                const docRefs = allDocs.map(doc => doc.ref);
                const usersLength = allDocs.length;
                let random = Math.floor(Math.random() * usersLength);
                let randomDoc = allDocs[random];
                let randomDocRef=docRefs[random];

                while(randomDoc.id==userID){
                   random = Math.floor(Math.random() * usersLength);
                   randomDoc = allDocs[random];
                  randomDocRef=docRefs[random];
                }
                const ref = {userRef:randomDocRef} as IUserRef;
                const matched = {matched:false} as IMatched;
                list.push({user:ref,match:matched});
            }
            const out = {  } as IHome ;
            out.userList=list;
            return out;
        }
        else if(swiped.userList.length >= 10){

          const frontItems = swiped.userList.slice(0, 10);
          const front=[];
          for(let i=0;i<frontItems.length;i++){
            const matched = {matched:false} as IMatched;
              front.push({user:frontItems[i].user,match:matched});
          }
          const back = swiped.userList.slice(10, swiped.userList.length);
            admin
            .firestore()
            .collection('Home')
            .doc(userID)
            .set(back, { merge: false });
            return front;
        }else{
          const listItems = swiped.userList;
          const list=[];
          const out = {} as IHome ;
          for(let i=0;i<listItems.length;i++){
            const matched = {matched:true} as IMatched;
            list.push({user:listItems[i].user,match:matched});
            out.userList?.push(listItems[i]);
          }
              for(let i=0;i<10-(swiped.userList.length);i++){
              const allDocs=(await admin.firestore().collection('User_Profile').get()).docs;
              const docRefs = allDocs.map(doc => doc.ref);
              const usersLength = allDocs.length;
              let random = Math.floor(Math.random() * usersLength);
              let randomDoc = allDocs[random];
              let randomDocRef=docRefs[random];
              while(randomDoc.id==userID){
                 random = Math.floor(Math.random() * usersLength);
                 randomDoc = allDocs[random];
                randomDocRef=docRefs[random];
              }
              const ref = {userRef:randomDocRef} as IUserRef;
              const matched = {matched:true} as IMatched;
              list.push({user:ref,match:matched});
              out.userList?.push(listItems[i]);
          }
          
          return out;
        }
        
      }

      async acceptUser(userID:string, acceptProfile:IProfile){ 
        const ref =   admin
        .firestore()
        .collection('User_Profile')
        .doc(userID);
        admin
          .firestore()
          .collection('Home')
          .doc(acceptProfile.userId)
          .set([ref], { merge: true });
      }
      
}