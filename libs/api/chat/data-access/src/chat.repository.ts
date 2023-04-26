import { IChat } from '@mp/api/chat/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { IMessages } from '@mp/api/chat/util';
@Injectable()
export class ChatRepository 
{
    async getChat(chatID: string) {
        return (await admin
          .firestore()
          .collection('Chats')
          .withConverter<IChat>({
            fromFirestore: (snapshot) => {
              return snapshot.data() as IChat;
            },
            toFirestore: (it: IChat) => it,
          })
          .doc(chatID)
          .get()).data();
      }

      async sendMessage(chatID : string, message:IMessages) {
        return await admin
          .firestore()
          .collection('Chats')
          .doc(chatID)
          .update({messages: FieldValue.arrayUnion(message)});
      }

      async createChat(chat: IChat) {
        const docRef = await admin
          .firestore()
          .collection('Chats')
          .add(chat);
        
        await admin
          .firestore()
          .collection('Chats')
          .doc(docRef.id)
          .update({chatID: docRef.id});

        return (await admin
          .firestore()
          .collection('Chats')
          .withConverter<IChat>({
            fromFirestore: (snapshot) => {
              return snapshot.data() as IChat;
            },
            toFirestore: (it: IChat) => it,
          })
          .doc(docRef.id)
          .get()).data();
      }

      async updateTime(chatID: string, time: number) {
        await admin
          .firestore()
          .collection('Chats')
          .doc(chatID)
          .update({timeRemaining: FieldValue.increment(time)});
          
        return this.getTime(chatID);
      }

      async getTime(chatID: string) {
        return (await admin
          .firestore()
          .collection('Chats')
          .withConverter<IChat>({
            fromFirestore: (snapshot) => {
              return snapshot.data() as IChat;
            },
            toFirestore: (it: IChat) => it,
          })
          .doc(chatID)
          .get()).data()?.timeRemaining;
      }
}