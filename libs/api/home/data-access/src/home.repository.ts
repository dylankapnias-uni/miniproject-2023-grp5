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
    // Get array of users that have accepted the current user
    // And array of users that current user has swiped on
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
    //will store list of ids for users that will be put on homepage
    let userList = [] as string[];
    // add a maximum of 10 users who've swiped on current user to list
    userList = swiped.accepted.slice(0, Math.min(swiped.accepted.length, 10));
    const userProfileRepository = new UserProfileRepository();
    // get profile of current user
    const userProfileDoc = (await userProfileRepository.getUserProfile(userID))?.data();
    if (userProfileDoc == undefined) {
      throw new Error('User profile not found');
    }
    console.log(filters);
    // If filter parameters were not passed then it defaults to 
    // user's interests
    if (filters == null || filters == undefined){
      console.log("filters is null or undefined")
      filters=userProfileDoc.interests;
      console.log(filters);
    }
    // if current user has less than 3 interests then throw error
    if (filters == null || filters == undefined || filters.length < 3){
      throw new Error("User profile incomplete: Interests incomplete");
    }
    // out will be the output object
    const userL: IUserMatch[] = [];
    const out: IHome = {userId:userID,userList:userL};
    // Add users that swiped on current user to out
    userList.forEach(e => {
      if(e != undefined && e != null &&  e.length > 0){
      userProfileRepository.getUserProfile(e).then((doc) => {
        if (doc == undefined) {
          throw new Error(`User profile not found: ${e}`);
        }
        const userMatch: IUserMatch = {user:doc.data(),match:true};
        out.userList.push(userMatch);
      });}
    });
    // if out has less than 10 users then add more users
    if(out.userList.length < 10){
      // get query snapshot of all users that have not been visited, 
      // and that are not already added to out
      userList.forEach(e => {
        swiped.visited.push(e);
      });
      let validDocsCollection = (admin
        .firestore()
        .collection('User_Profile')
        .where('userId', 'not-in', swiped.visited));


      // validDocsCollection = (validDocsCollection.where('userId', 'not-in', userList));
      // existence check to appease the linter
      if(filters){
        // narrow query to only contain users that share at least one interest
        if(filters.length>0){
          // validDocsCollection = (validDocsCollection
          //   .where('interests', 'array-contains-any', filters));
        }
      }
      // If user is heterosexual
      // if (userProfileDoc.sexuality == 'heterosexual'){
      //   // select users that are of opposite gender from collection of all users
      //   let opGender:String;
      //   if(userProfileDoc.gender=="Male"){
      //     opGender="Female";
      //   }else{
      //     opGender="Male";
      //   }

      //   validDocsCollection = (validDocsCollection
      //     .where('gender', '==', opGender));
      //   // select users that are not homosexual from collection of oposite gender users
      //   validDocsCollection = (validDocsCollection
      //     .where('sexuality', '==', "heterosexual"));
      // }
      // // If user is homosexual
      // else if(userProfileDoc.sexuality == 'homosexual'){
      //   // select users that are of same gender from collection of all users
      //   validDocsCollection = (validDocsCollection
      //     .where('gender', '==', userProfileDoc.gender));
      //   // select users that are not heterosexual from collection of same gender user
      //   validDocsCollection = (validDocsCollection
      //     .where('sexuality', '==', "heterosexual"));
      // }
      // // If user is bisexual
      // else if(userProfileDoc.sexuality == 'bisexual') {
      //   // contains user IDs that are invalid due to gender/orientation mismatch
      //   const invalidIDs: string[] = [];
      //   let opGender:String;
      //   if(userProfileDoc.gender=="Male"){
      //     opGender="Female";
      //   }else{
      //     opGender="Male";
      //   }
      //   // Create query of users in valid docs that are of opposite gender
      //   // but homosexual
      //   let temp0 = (validDocsCollection
      //     .where('gender', '==', opGender));
      //   temp0 = (temp0.where('sexuality', '==', 'homosexual'));

      //   const temp0QSnap = await temp0.get();
      //   // Add invalid IDs to list
      //   temp0QSnap.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      //     const userData = doc.data() as IUserProfile;
      //     if (userData) {
      //       invalidIDs.push(userData.userId);
      //     }
      //   });

      //   // Create query of users in valid docs that are of same gender
      //   // but heterosexual
      //   let temp1 = (validDocsCollection
      //     .where('gender', '==', userProfileDoc.gender));
      //   temp1 = (temp1.where('sexuality', '==', 'heterosexual'));
        
      //   const temp1QSnap = await temp1.get();
      //   // Add invalid IDs to list
      //   temp1QSnap.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      //     const userData = doc.data() as IUserProfile;
      //     if (userData) {
      //       invalidIDs.push(userData.userId);
      //     }
      //   });
      //   console.log(JSON.stringify(invalidIDs));
      //   // Remove users from query that are in invalidIDs
      //   //validDocsCollection = (validDocsCollection
      //   //  .where('userId', 'not-in', invalidIDs));
      // }

      // Fill out with users that are in validDocsCollection
      // validDocsCollection = validDocsCollection
      //   .where('userId', '<=', randomIDGeneratorInator(userProfileDoc.userId.length))
      //   .limit(10-out.userList.length);
      const validDocsSnapshot = await validDocsCollection.get();
      validDocsSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const userMatch: IUserMatch = {user:doc.data() as IUserProfile,match:false};
        if(out.userList.length < 10)
          out.userList.push(userMatch);
      });
    }
      console.log("194:"+out.userList.length)
      return out;
  }

  async acceptUser(userID:string, acceptedUser: IUserMatch){
    // another bullshit check to appease the fictional typescript gods
    // because the dozens of checks before this are not enough
    console.log("GGGGGGGGGGG");
    
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

