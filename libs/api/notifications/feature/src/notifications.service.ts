
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { IFetchNotificationsRequest, IFetchNotificationsResponse, FetchNotificationsQuery, ClearNotificationsCommand, CreateNotificationCommand, IClearNotificationsRequest, IClearNotificationsResponse, ICreateNotificationRequest, IDeleteNotificationRequest, ISendNotificationRequest } from '@mp/api/notifications/util';
import { DeleteNotificationCommand, SendNotificationCommand } from '@mp/api/notifications/util';
import { ICreateNotificationResponse, IDeleteNotificationResponse, ISendNotificationResponse } from '@mp/api/notifications/util';

@Injectable()
export class NotificationService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

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

  async fetchNotifications(
    request: IFetchNotificationsRequest
  ): Promise<IFetchNotificationsResponse> {
    return await this.queryBus.execute<
      FetchNotificationsQuery,
      IFetchNotificationsResponse
    >(new FetchNotificationsQuery(request));
  }

}
