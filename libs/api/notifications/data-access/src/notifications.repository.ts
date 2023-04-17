import { INotification } from '@mp/api/notifications/util';
import { IInbox } from '@mp/api/notifications/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationRepository {
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
            inbox: admin.firestore.FieldValue.arrayUnion(notification)
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