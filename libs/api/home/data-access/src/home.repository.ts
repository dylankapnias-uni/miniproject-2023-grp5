import { Injectable } from '@nestjs/common';
import { IHome, IMatched, IUserMatch, IUserRef } from '@mp/api/home/util';
import * as admin from 'firebase-admin';
import { IProfile } from '@mp/api/profiles/util';
import { IInterests } from '@mp/api/interests/util';

    //Behold the monstrosity that is the home repository

@Injectable()
export class HomeRepository {
    private filter={} as IInterests
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
        if(swiped.swiped==null||swiped.swiped==undefined){
            const list=[];
            const allDocs=(await admin.firestore().collection('User_Profile').get()).docs;
            const out = {userId:userID,userList:[]} as IHome ;
            for(let i=0;i<10;i++){
                // const docRefs = allDocs.map(doc => doc.ref);
                const usersLength = allDocs.length;
                let random = Math.floor(Math.random() * usersLength);
                let randomDoc = allDocs[random];
                // let randomDocRef=docRefs[random];
                
                if(this.filter==null||this.filter==undefined){
                  while(randomDoc.id==userID){
                    random = Math.floor(Math.random() * usersLength);
                    randomDoc = allDocs[random];
 
                   // randomDocRef=docRefs[random];
                 }
                }else{
                  const tempProfile = randomDoc.data() as IProfile;
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
        }else{
          const listItems = swiped.swiped;
          const list=[];
          // const out = {} as IHome ;
          const out = {userId:userID,userList:[]} as IHome ;
          for(let i=0;i<listItems.length;i++){
            // const matched = {matched:true} as IMatched;
            // list.push({user:listItems[i].user,match:matched});
            // out.userList?.push(listItems[i]);
            const profile = (await (listItems[i].get())).data() as IProfile;
            const userMatch = {user:profile,match:true} as IUserMatch;
            out.userList?.push(userMatch);
          }
              for(let i=0;i<10-(swiped.swiped.length);i++){
              const allDocs=(await admin.firestore().collection('User_Profile').get()).docs;
              // const docRefs = allDocs.map(doc => doc.ref);
              const usersLength = allDocs.length;
              let random = Math.floor(Math.random() * usersLength);
              let randomDoc = allDocs[random];
              // let randomDocRef=docRefs[random];
              if(this.filter==null||this.filter==undefined){
                while(randomDoc.id==userID){
                  random = Math.floor(Math.random() * usersLength);
                  randomDoc = allDocs[random];

                 // randomDocRef=docRefs[random];
               }
              }else{
                const tempProfile = randomDoc.data() as IProfile;
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
              // const matched = {matched:true} as IMatched;
              // list.push({user:ref,match:matched});
              // out.userList?.push(listItems[i]);
              const profile = (await (listItems[i].get())).data() as IProfile;
              const userMatch = {user:profile,match:false} as IUserMatch;
              out.userList?.push(userMatch);
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
          .update({swiped: admin.firestore.FieldValue.arrayUnion(ref)});
      }
      
}