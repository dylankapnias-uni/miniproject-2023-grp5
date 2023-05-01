import { IHome, IParsingData } from '../interfaces';

export class UserHomeCreatedEvent {
  constructor(public readonly home: IParsingData) {}
}
