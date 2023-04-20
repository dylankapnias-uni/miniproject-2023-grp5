import { IHome } from '../interfaces';

export class UserAcceptedEvent {
  constructor(public readonly home: IHome) {}
}
