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
      .create({'inbox':[]}).then((res) => console.log(res));
    }

    async getNotifications(userID: string) {
        return (await admin
          .firestore()
          .collection('Notifications')
          .withConverter<INotification>({
            fromFirestore: (snapshot) => {
              return snapshot.data() as INotification;
            },
            toFirestore: (it: INotification) => it,
          })
          .doc(userID)
          .get()).data();
      }

      async sendNotification(userID: string, notification : IInbox)
      {
        if(notification.recipient==null || notification.recipient==undefined){
          console.log("No Recipient provided");
          return;
        }else{
        return await admin
        .firestore()
        .collection('Notifications')
        .doc(notification.recipient)
        .update({
            'inbox': FieldValue.arrayUnion(notification)
        })
      }
      }
      
      async deleteNotification(userID : string, inInbox: IInbox[])
      {

        return await admin
        .firestore()
        .collection('Notifications')
        .doc(userID)
        .update({
          'inbox': inInbox
        })
      }

      async clearAllNotifications(userID : string)
      {

        return await admin
        .firestore()
        .collection('Notifications')
        .doc(userID)
        .update({
          'inbox': []
        })
      }
}