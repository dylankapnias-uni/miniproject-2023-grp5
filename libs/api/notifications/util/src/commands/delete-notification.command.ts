import { IDeleteNotificationRequest } from '../requests';

export class DeleteNotificationCommand {
  constructor(public readonly request: IDeleteNotificationRequest) {}
}
