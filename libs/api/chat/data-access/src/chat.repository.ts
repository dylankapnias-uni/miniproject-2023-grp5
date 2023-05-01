import { IChat } from '@mp/api/chat/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { IMessages } from '@mp/api/chat/util';
@Injectable()
export class ChatRepository 
{
    async getChat(chatId: string) {
      if(chatId != undefined && chatId != null &&  chatId.length > 0){
        return (await admin
          .firestore()
          .collection('Chat')
          .withConverter<IChat>({
            fromFirestore: (snapshot) => {
              return snapshot.data() as IChat;
            },
            toFirestore: (it: IChat) => it,
          })
          .doc(chatId)
          .get()).data();
        }

        else
          return null;
      }

      async sendMessage(chatId : string, message:IMessages) {
        return await admin
          .firestore()
          .collection('Chat')
          .doc(chatId)
          .update({messages: FieldValue.arrayUnion(message)});
      }

      async createChat(chat: IChat) {
        const docRef = await admin
          .firestore()
          .collection('Chat')
          .add(chat);
        
        await admin
          .firestore()
          .collection('Chat')
          .doc(docRef.id)
          .update({chatId: docRef.id});

        return (await admin
          .firestore()
          .collection('Chat')
          .withConverter<IChat>({
            fromFirestore: (snapshot) => {
              return snapshot.data() as IChat;
            },
            toFirestore: (it: IChat) => it,
          })
          .doc(docRef.id)
          .get()).data();
      }

      async updateTime(chatId: string, time: number) {
        await admin
          .firestore()
          .collection('Chat')
          .doc(chatId)
          .update({timeRemaining: FieldValue.increment(time)});
          
        return this.getTime(chatId);
      }

      async getTime(chatId: string) {
        return (await admin
          .firestore()
          .collection('Chat')
          .withConverter<IChat>({
            fromFirestore: (snapshot) => {
              return snapshot.data() as IChat;
            },
            toFirestore: (it: IChat) => it,
          })
          .doc(chatId)
          .get()).data()?.timeRemaining;
      }
}