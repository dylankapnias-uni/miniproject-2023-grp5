import { IChatList, IChatReferences } from '@mp/api/chat-list/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DocumentReference } from '@firebase/firestore-types'
import { FieldValue } from 'firebase-admin/firestore';
@Injectable()
export class ChatListRepository {

  async createChatList(creatorID:string) {
    return await admin
      .firestore()
      .collection('Chatlist')
      .doc(creatorID)
      .create({userList: []});
  }

  async getForUserID(userID: string) {
    return (await admin
      .firestore()
      .collection('Chatlist')
      .withConverter<(IChatReferences[])>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as (IChatReferences[]);
        },
        toFirestore: (it: (IChatReferences[])) => it,
      })
      .doc(userID)
      .get()).data() as (IChatReferences[]);
  }

  async addToChatList(creatorID:string,chatID:string, otherUser:string ) {
    const entry: IChatReferences = {chatRef:chatID, otherUserID:otherUser};
    return await admin
      .firestore()
      .collection('Chatlist')
      .doc(creatorID)
      .update({userList: FieldValue.arrayUnion(entry)});
  }

}
