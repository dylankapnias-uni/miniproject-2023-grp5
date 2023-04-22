import { INotification } from '@mp/api/notifications/util';
import { IInbox } from '@mp/api/notifications/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

@Injectable()
export class NotificationRepository {
  
    async createNotification(userId:string){
      return await admin
      .firestore()
      .collection('Notifications')
      .doc(userId)
      .create({Inbox:[]}).then((res) => console.log(res));
    }

    async getNotifications(userID: string) {
        return await admin
          .firestore()
          .collection('Notifications')
          .withConverter<INotification>({
            fromFirestore: (snapshot) => {
              return snapshot.data() as INotification;
            },
            toFirestore: (it: INotification) => it,
          })
          .doc(userID)
          .get();
      }

      async sendNotification(userID: string, notification : IInbox)
      {
        return await admin
        .firestore()
        .collection('Notifications')
        .doc(userID)
        .update({
            'inbox': FieldValue.arrayUnion(notification)
        })
      }
      
      async clearNotification(userID : string)
      {
        return await admin
        .firestore()
        .collection('Notifications')
        .doc(userID)
        .update({
            inbox: admin.firestore.FieldValue.delete()
        })
      }
}