import { IClearNotificationsRequest } from '../requests';

export class ClearNotificationsCommand {
  constructor(public readonly request: IClearNotificationsRequest) {}
}
