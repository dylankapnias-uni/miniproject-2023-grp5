import { IClearNotificationRequest } from '../requests';

export class ClearNotificationCommand {
  constructor(public readonly request: ClearNotificationCommand) {}
}
