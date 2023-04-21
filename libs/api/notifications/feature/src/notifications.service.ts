
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IDeleteNotificationRequest, ISendNotificationRequest } from '../../util/src/requests';
import { DeleteNotificationCommand, SendNotificationCommand } from '../../util/src/commands';
import { IDeleteNotificationResponse, ISendNotificationResponse } from '@mp/api/notifications/util';

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
}
