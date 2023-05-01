import { IHome, IParsingData, IUserMatch } from '../interfaces';

export class UserAcceptedEvent {
  constructor(public readonly home: IParsingData, public readonly acceptedUser: IUserMatch) {}
}
