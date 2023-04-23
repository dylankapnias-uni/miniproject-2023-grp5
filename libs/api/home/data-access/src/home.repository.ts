import { Injectable } from '@nestjs/common';
import { IHome, IMatched, IUserMatch, IUserRef } from '@mp/api/home/util';
import * as admin from 'firebase-admin';
import { IProfile } from '@mp/api/profiles/util';
import { IInterests } from '@mp/api/interests/util';
import { IUserProfile } from '@mp/api/users/util';
    //Behold the monstrosity that is the home repository, abandon all hope, ye who enter here
    //Ashen one, thou must link the first flame.
@Injectable()
export class HomeRepository {
    private filter={} as IInterests

    async createHome(userID: string) {
      return (await admin
        .firestore()
        .collection('Home')
        .doc(userID)
        .create({accepted:[],visited:[userID]}));
    }



    async getHomeValuesForUser(userID: string) {
      return (await admin
        .firestore()
        .collection('Home')
        .withConverter<IUserRef>({
            fromFirestore: (snapshot) => {
                return snapshot.data() as IUserRef;
            },
            toFirestore: (it: IUserRef) => it,
        })
        .doc(userID)
        .get()).data() as IUserRef;
    }
    
    async getUserList(userID: string) {
        const swiped =  (await admin
            .firestore()
            .collection('Home')
            .withConverter<IUserRef>({
                fromFirestore: (snapshot) => {
                    return snapshot.data() as IUserRef;
                },
                toFirestore: (it: IUserRef) => it,
            })
            .doc(userID)
            .get()).data() as IUserRef;
        //list of ids for users to put on homepage
        let userList = [] as string[];
      
        userList = swiped.accepted.slice(0, Math.min(swiped.accepted.length, 10));
        
        if(userList.length < 10){
            const allDocs=(await admin.firestore().collection('User_Profile').get()).docs;
            const docList : string[] = [];
            allDocs.forEach((doc) => {
              docList.push(doc.id) // For doc name
            });
            //const validDocs = await admin.firestore().collection('User_Profile').where('country', 'not-in', docList).get();
            // Get initial collection of users
            const validDocsCollection = (admin.firestore().collection('User_Profile').where('userId', 'not-in', swiped.visited));
            if (sexuality == 'straight')
              validDocsCollection = (validDocsCollection.where('gender', '!=', othergender));
            
            validDocsCollection = validDocsCollection.where('sexuality', '==', swiped.visited)

            if(validDocs.empty){
              console.log("Visited all users");
              return;
            }
            const out = {userId:userID,userList:[]} as IHome ;
            for(let i=0;i<(10-userList.length);i++){
                // const docRefs = allDocs.map(doc => doc.ref);
                const usersLength = validDocs.length;
                let random = Math.floor(Math.random() * usersLength);
                let randomDoc = validDocs[random].;
                // let randomDocRef=docRefs[random];
                
                if(this.filter==null||this.filter==undefined){
                  while(randomDocId==userID){
                    random = Math.floor(Math.random() * usersLength);
                    randomDocId = docList[random];
 
                   // randomDocRef=docRefs[random];
                  }
                }else{
                  const randomDoc = (await admin.firestore().collection('User_Profile').doc(randomDocId).get());
                  const tempProfile = randomDoc.data() as IUserProfile;
                  this.filter = tempProfile.interests as IInterests;
                  if(tempProfile.interests?.subCategory){
                    const found = (tempProfile.interests?.subCategory).some(r=> (this.filter.subCategory).includes(r))
                    while(randomDoc.id==userID && found){
                       random = Math.floor(Math.random() * usersLength);
                       randomDoc = allDocs[random];
    
                      // randomDocRef=docRefs[random];
                    }
                  }else{
                    while(randomDoc.id==userID){
                      random = Math.floor(Math.random() * usersLength);
                      randomDoc = allDocs[random];
   
                     // randomDocRef=docRefs[random];
                   }
                  }
                  
                }
                
                
                // const ref = {userRef:randomDocRef} as IUserRef;
                //Trying to implement using IProfile
                const profile = randomDoc.data() as IProfile;
                const userMatch = {user:profile,match:false} as IUserMatch;
                // const matched = {matched:false} as IMatched;
                out.userList?.push(userMatch);
                // list.push({user:ref,);
            }
            
            return out;
        }
        else if(swiped.swiped.length >= 10){

          const frontItems = swiped.swiped.slice(0, 10);
          // const front=[];
          const out = {userId:userID,userList:[]} as IHome;

          for(let i=0;i<frontItems.length;i++){
            // const matched = {matched:false} as IMatched;
              // front.push({user:frontItems[i].user,match:matched});
              const profile = (await frontItems[i].get()).data() as IProfile;
              const userMatch = {user:profile,match:true} as IUserMatch;
              out.userList?.push(userMatch);
          }
          const back = swiped.swiped.slice(10, swiped.swiped.length);
            admin
            .firestore()
            .collection('Home')
            .doc(userID)
            .set({swiped:back}, { merge: false });
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
          .update({swiped: admin.firestore.FieldValue.arrayUnion(ref)});
      }
      
}