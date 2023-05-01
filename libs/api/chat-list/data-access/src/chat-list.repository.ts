import { IChatList, IChatReferences, IMuthaFuckingAppChatList, IFetchChatListResponse } from '@mp/api/chat-list/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
//import { DocumentReference } from '@firebase/firestore-types'
import { FieldValue } from 'firebase-admin/firestore';
import { IUserProfile } from '@mp/api/users/util';
@Injectable()
export class ChatListRepository {

  async createChatList(creatorID:string) {
    console.log("creating chatlist for user: "+creatorID);
    return await admin
      .firestore()
      .collection('Chatlist')
      .doc(creatorID)
      .create({userId: creatorID, chatList:[]});
  }

  async getForUserID(userID: string) {
    if(userID != undefined && userID != null &&  userID.length > 0)
    {
      return (await admin
        .firestore()
        .collection('Chatlist')
        .withConverter<(IChatList)>({
          fromFirestore: (snapshot) => {
            return snapshot.data() as (IChatList);
          },
          toFirestore: (it: (IChatList)) => it,
        })
        .doc(userID)
        .get()
        .catch((error) => {
          console.log(`Error getting chatlist for user: ${userID}`);
          throw error;
        }))
        .data() as (IChatList); 
        
    }
    
    throw new Error("Iwas joking aout killing myself but I'm not so sure that it's a joke anymore :)");
  }


  async addToChatList(creatorID:string,chatID:string, otherUserId:string ) {
    const otherUserData = (await admin
    .firestore()
    .collection('User_Profile')
    .withConverter<(IUserProfile)>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as (IUserProfile);
      },
      toFirestore: (it: (IUserProfile)) => it,
    })
    .doc(otherUserId)
    .get()).data();
    if ( otherUserData == undefined) {
      throw new Error("I will kill you and then myself");
    }
    const entry: IChatReferences = {chatRef:chatID, otherUserId:otherUserId};
    return await admin
      .firestore()
      .collection('Chatlist')
      .doc(creatorID)
      .update({chatList: FieldValue.arrayUnion(entry)});
  }

  async fetchFuckingAppChatList(userID: string) {
    console.log("ID:"+userID);
    if(userID != undefined && userID != null &&  userID.length > 0)
    {
    const ref = (await admin
    .firestore()
    .collection('Chatlist')
    .withConverter<(IChatList)>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as (IChatList);
      },
      toFirestore: (it: (IChatList)) => it,
    })
    .doc(userID)
    .get()
    .catch((error) => {
      throw new Error(error);
    })).data();
    if (ref == undefined) {
      throw new Error("User doesn't exist");
    }
    return ref;
    }
    else
    console.log("Fuck this shit");
    throw new Error("I'm done");
    // const userData = userRef.data();
    // if (userData == undefined)
    //   throw new Error('Log in before you can see your chats');
    // //   export interface IMuthaFuckingAppChatList {
    // //     userId: string,
    // //     chatList: {
    // //       chatRef: string,
    // //       otherUser: {
    // //         userId: string,
    // //         name: string,
    // //         profilePicture: string
    // //       }
    // //     }[]
    // // }
    // const response: IFetchChatListResponse = {
    //   chatList: {
    //     userId: userID,
    //     chatList: []
    //   }
    // };


    // return new Promise<IFetchChatListResponse>((resolve) => {
    //   if (userData.chatList == null || userData.chatList == undefined) {
    //     resolve(response);
    //   }
    //   if (userData.chatList == null || userData.chatList == undefined) {
    //     throw new Error("Why are you like this typescript");
    //   }
    //   userData.chatList.forEach((chat) => {
    //     admin
    //       .firestore()
    //       .collection('User_Profile')
    //       .withConverter<(IUserProfile)>({
    //         fromFirestore: (snapshot) => {
    //           return snapshot.data() as (IUserProfile);
    //         },
    //         toFirestore: (it: (IUserProfile)) => it,
    //       })
    //       .doc(chat.otherUserId)
    //       .get()
    //       .then((otherUserRef) => {
    //         const otherUserData = otherUserRef.data();
    //         // if user doesn't exist then remove it from the users chatlist
    //         if (otherUserData == undefined) {
    //           if (userData.chatList == null || userData.chatList == undefined) {
    //             throw new Error("Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You");
    //           }
    //           userData.chatList.splice(userData.chatList.indexOf(chat), 1);
    //         }
    //       //   export interface IMuthaFuckingAppChatList {
    //       //     userId: string,
    //       //     chatList: {
    //       //       chatRef: string,
    //       //       otherUser: {
    //       //         userId: string,
    //       //         name: string,
    //       //         profilePicture: string
    //       //       }
    //       //     }[]
    //       // }
    //         // otherwise add it to output
    //         response.chatList.chatList.push({
    //           chatRef: chat.chatRef,
    //           otherUser: {
    //             userId: (otherUserData != undefined ? otherUserData.userId : " Fuck you typescript you daft redacted"),
    //             name: (otherUserData != undefined && otherUserData.name != undefined && otherUserData.name != null 
    //               ? otherUserData.name : " Fuck you typescript you daft redacted"),
    //             profilePicture: (otherUserData != undefined && otherUserData.profilePicture != undefined && otherUserData.profilePicture != null
    //               ? otherUserData.profilePicture: " Fuck you typescript you daft redacted")
    //           }
    //         })

    //         if (userData.chatList == null || userData.chatList == undefined) {
    //           throw new Error("Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You Fuck You");
    //         }
    //         if (response.chatList.chatList.length == userData.chatList.length)
    //           resolve(response);

    //         // return otherUserData as IUserProfile;
    //       })
    //       .catch((error) => {
    //         console.log("Shit may or may not be fucked in fetchFuckingAppChatList");
    //         console.log(error);
    //       })
    //   })
    // })
  }
}
