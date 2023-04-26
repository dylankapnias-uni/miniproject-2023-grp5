/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { IHome, IMatched, IUserMatch, IUserRef } from '@mp/api/home/util';
import * as admin from 'firebase-admin';
import { IProfile } from '@mp/api/profiles/util';
import { IInterests } from '@mp/api/interests/util';
import { IUserProfile } from '@mp/api/users/util';
import { UserProfileRepository } from '@mp/api/users/data-access';
import { DocumentData, DocumentSnapshot, FieldValue, QueryDocumentSnapshot } from 'firebase-admin/firestore';
    //Behold the monstrosity that is the home repository, abandon all hope, ye who enter here
    //Ashen one, thou must link the first flame.

    //We tried ¯\_(ツ)_/¯
@Injectable()
export class HomeRepository {
  async createHome(userID: string) {
    return (await admin
      .firestore()
      .collection('Home')
      .doc(userID)
      .create({
        userId: userID, 
        accepted:[],
        visited:[userID]
      }));
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
    
  async getUserList(userID: string,filters:IInterests[] | null | undefined) {
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
    // add users who've swiped on current user to list
    userList = swiped.accepted.slice(0, Math.min(swiped.accepted.length, 10));
    const userProfileRepository = new UserProfileRepository();
    const userProfileDoc = (await userProfileRepository.getUserProfile(userID))?.data();
    if (userProfileDoc == undefined) {
      throw new Error('User profile not found');
    }
    if (filters == null || filters == undefined){
      //filters = userProfileDoc?.interests;          Maybe? Idk if we want such a strict enforcement of interests
      filters=[];
    }
    const userL: IUserMatch[] = [];
    const out: IHome = {userId:userID,userList:userL};
    // Add users that swiped on current user to output
    userList.forEach(e => {
      userProfileRepository.getUserProfile(e).then((doc) => {
        if (doc == undefined) {
          throw new Error('User profile not found');
        }
        const userMatch: IUserMatch = {user:doc.data(),match:true};
        out.userList.push(userMatch);
      });
    });
    if(out.userList.length < 10){
      
      let validDocsCollection = (admin.firestore().collection('User_Profile').where('userId', 'not-in', swiped.visited));
      if(filters){
        if(filters.length>0){
          validDocsCollection = (validDocsCollection.where('interests', 'array-contains-any', filters));
        }
      }
      // Get initial collection of users that have not been swiped on
        

      // If user is heterosexual
      if (userProfileDoc.sexuality == 'heterosexual'){
        // select users that are of opposite gender from collection of all users
        validDocsCollection = (validDocsCollection.where('gender', '!=', userProfileDoc.gender));
        // select users that are not homosexual from collection of oposite gender users
        validDocsCollection = (validDocsCollection.where('sexuality', '!=', "homosexual"));
      }
  
      // If user is homosexual
      else if(userProfileDoc.sexuality == 'homosexual'){
        // select users that are of same gender from collection of all users
        validDocsCollection = (validDocsCollection.where('gender', '==', userProfileDoc.gender));
        // select users that are not heterosexual from collection of same gender user
        validDocsCollection = (validDocsCollection.where('sexuality', '==', "heterosexual"));
      }
      else if(userProfileDoc.sexuality == 'bisexual') 
      {
        let temp0 = (validDocsCollection.where('gender', '!=', userProfileDoc.gender));
        temp0 = (temp0.where('sexuality', '==', 'homosexual'));

        const temp0QSnap = await temp0.get();

        const tempIDs: string[] = [];

        temp0QSnap.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const userData = doc.data() as IUserProfile;
          if (userData) {
            tempIDs.push(userData.userId);
          }
        });

        // list of heterosexual users of same gender
        let temp1 = (validDocsCollection.where('gender', '==', userProfileDoc.gender));
        temp1 = (temp1.where('sexuality', '==', 'heterosexual'));
        
        const temp1QSnap = await temp1.get();
        temp1QSnap.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const userData = doc.data() as IUserProfile;
          if (userData) {
            tempIDs.push(userData.userId);
          }
        });
        console.log(JSON.stringify(tempIDs));

        validDocsCollection = (validDocsCollection.where('userId', 'not-in', tempIDs));
      }

      // validDocsCollection: query that gets a list of users documents that are valid and have not swiped on the current user
      // userList: We have a list of userIds of users who swiped on the current user  

      validDocsCollection = validDocsCollection.where('userId', '<=', randomIDGeneratorInator(userProfileDoc.userId.length)).limit(10-out.userList.length);
      const validDocsSnapshot = await validDocsCollection.get();
      validDocsSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const userMatch: IUserMatch = {user:doc.data() as IUserProfile,match:false};
        out.userList.push(userMatch);
      });
        
    }

      return out;
  }

  async acceptUser(userID:string, acceptedUser: IUserMatch){
    // another bullshit check to appease the fictional typescript gods
    // because the dozens of checks before this are not enough
    if (acceptedUser == undefined || acceptedUser.user == undefined) {
      throw new Error("Scizzo swiped on a user that doesn't exist :(");
    }
    // add accpeted user to current user's visited array
    await admin
      .firestore()
      .collection('Home')
      .doc(userID)
      .update({
      'visited':FieldValue.arrayUnion(acceptedUser.user.userId)});

    // if accepted user has not previously accepted current user, 
    // add current user to their accepted array
    if (!acceptedUser.match) {
      await admin
        .firestore()
        .collection('Home')
        .doc(acceptedUser.user.userId)
        .update({
        'accepted':FieldValue.arrayUnion(userID)});
    }
    // Otherwise, remove accepted user from current user's accepted array
    else {
      await admin
        .firestore()
        .collection('Home')
        .doc(userID)
        .update({
        'accepted':FieldValue.arrayRemove(acceptedUser.user.userId)});
    }
  }

  async rejectUser(userID:string, rejectedUser:IUserMatch){
    // another bullshit check to appease the fictional typescript gods
    // because the dozens of checks before this are not enough
    if (rejectedUser == undefined || rejectedUser.user == undefined) {
      throw new Error("cry about it");
    }
    // add rejected user to current user's visited array
    admin
      .firestore()
      .collection('Home')
      .doc(userID)
      .update({
      'visited':FieldValue.arrayUnion(rejectedUser.user.userId)});
    
    // if rejected user has previously accepted the current user, 
    // remove them from current user's accepted array
    if (rejectedUser.match) {
      admin
        .firestore()
        .collection('Home')
        .doc(rejectedUser.user.userId)
        .update({
        'accepted':FieldValue.arrayRemove(userID)});
    }
  }
}

function randomIDGeneratorInator(l:number):string {
  let randumID = "";
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let x = 0; x < l; ++x){
    randumID += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return randumID;
}

