import { IChat } from '@mp/api/chat/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ChatRepository 
{
    async getChat(chatID: string) {
        return await admin
          .firestore()
          .collection('Chats')
          .withConverter<IChat>({
            fromFirestore: (snapshot) => {
              return snapshot.data() as IChat;
            },
            toFirestore: (it: IChat) => it,
          })
          .doc(chatID)
          .get();
      }

      async updateChat(chatID : string, chat: IChat) {
        return await admin
          .firestore()
          .collection('Chats')
          .doc(chatID)
          .set(chat, { merge: true });
      }

      async createChat(chatID : string, chat: IChat) {
        return await admin
          .firestore()
          .collection('Chats')
          .doc(chatID)
          .create(chat);
      }
}