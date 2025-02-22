import { AuthService } from '@mp/api/auth/feature';
import { NestFactory } from '@nestjs/core';
import { UserRecord } from 'firebase-admin/auth';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { 
  IClearNotificationsRequest,
  IClearNotificationsResponse,
  ICreateNotificationRequest,
  ICreateNotificationResponse,
  IDeleteNotificationRequest,
  IDeleteNotificationResponse,
  IFetchNotificationsRequest,
  IFetchNotificationsResponse,
  ISendNotificationRequest,
  ISendNotificationResponse 
} from '@mp/api/notifications/util';

import { NotificationService } from '@mp/api/notifications/feature';

export const SendNotification = functions.https.onCall(
    async (
      request: ISendNotificationRequest
    ): Promise<ISendNotificationResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(NotificationService);
      return service.sendNotification(request);
    }
  );

  export const DeleteNotification = functions.https.onCall(
    async (
      request: IDeleteNotificationRequest
    ): Promise<IDeleteNotificationResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(NotificationService);
      return service.deleteNotification(request);
    }
  );

  export const CreateNotification = functions.https.onCall(
    async (
      request: ICreateNotificationRequest
    ): Promise<ICreateNotificationResponse> => {

      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(NotificationService);
      return service.createNotification(request);
    }
  );

  export const ClearNotifications= functions.https.onCall(
    async (
      request: IClearNotificationsRequest
    ): Promise<IClearNotificationsResponse> => {

      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(NotificationService);
      return service.clearNotifications(request);
    }
  );

  export const FetchNotifications = functions.https.onCall(
    async (
      request: IFetchNotificationsRequest
    ): Promise<IFetchNotificationsResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(NotificationService);
      return service.fetchNotifications(request);
    }
  )
