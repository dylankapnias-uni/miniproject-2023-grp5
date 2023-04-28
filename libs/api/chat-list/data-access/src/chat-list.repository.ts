import { IChatList, IChatReferences } from '@mp/api/chat-list/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
//import { DocumentReference } from '@firebase/firestore-types'
import { FieldValue } from 'firebase-admin/firestore';
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
      .get()).data() as (IChatList);
  }

  async addToChatList(creatorID:string,chatID:string, otherUser:string ) {
    const entry: IChatReferences = {chatRef:chatID, otherUserID:otherUser};
    return await admin
      .firestore()
      .collection('Chatlist')
      .doc(creatorID)
      .update({chatList: FieldValue.arrayUnion(entry)});
  }

}
