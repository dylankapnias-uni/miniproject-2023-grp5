
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ClearNotificationsCommand, CreateNotificationCommand, IClearNotificationsRequest, IClearNotificationsResponse, ICreateNotificationRequest, IDeleteNotificationRequest, ISendNotificationRequest } from '@mp/api/notifications/util';
import { DeleteNotificationCommand, SendNotificationCommand } from '@mp/api/notifications/util';
import { ICreateNotificationResponse, IDeleteNotificationResponse, ISendNotificationResponse } from '@mp/api/notifications/util';

@Injectable()
export class NotificationService {
  constructor(private readonly commandBus: CommandBus) {}

  async deleteNotification(
    request: IDeleteNotificationRequest
  ): Promise<IDeleteNotificationResponse> {
    return await this.commandBus.execute<
      DeleteNotificationCommand,
      IDeleteNotificationResponse
    >(new DeleteNotificationCommand(request));
  }

  async sendNotification(
    request: ISendNotificationRequest
  ): Promise<ISendNotificationResponse> {
    return await this.commandBus.execute<
      SendNotificationCommand,
      ISendNotificationResponse
    >(new SendNotificationCommand(request));
  }

  async createNotification(
    request: ICreateNotificationRequest
  ): Promise<ICreateNotificationResponse> {
    return await this.commandBus.execute<
      CreateNotificationCommand,
      ICreateNotificationResponse
    >(new CreateNotificationCommand(request));
  }

  async clearNotifications(
    request: IClearNotificationsRequest
  ): Promise<IClearNotificationsResponse> {
    return await this.commandBus.execute<
      ClearNotificationsCommand,
      IClearNotificationsResponse
    >(new ClearNotificationsCommand(request));
  }

}
