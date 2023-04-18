import { IChatList } from '@mp/api/chat-list/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DocumentReference } from '@firebase/firestore-types'
@Injectable()
export class ChatListRepository {
  async getForUserID(userID: string) {
    return await admin
      .firestore()
      .collection('Chatlist')
      .withConverter<IChatList>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IChatList;
        },
        toFirestore: (it: IChatList) => it,
      })
      .doc(userID)
      .get();
  }

  async addToChatList(creatorID:string,chatID:DocumentReference, otherUser:DocumentReference ) {
    var entry: IChatList = {chatRef:chatID, otherUserID:otherUser};
    return await admin
      .firestore()
      .collection('Chatlist')
      .doc(creatorID)
      .create(entry);
  }

}
