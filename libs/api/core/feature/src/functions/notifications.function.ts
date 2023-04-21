import { AuthService } from '@mp/api/auth/feature';
import { NestFactory } from '@nestjs/core';
import { UserRecord } from 'firebase-admin/auth';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { IDeleteNotificationRequest, IDeleteNotificationResponse, ISendNotificationRequest, ISendNotificationResponse } from '@mp/api/notifications/util';
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
