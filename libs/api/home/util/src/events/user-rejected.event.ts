import { IHome, IParsingData, IUserMatch } from '../interfaces';

export class UserRejectedEvent {
  constructor(public readonly home: IParsingData) {}
}
