import { IHome } from '../interfaces';

export class HomeCreatedEvent {
  constructor(public readonly home: IHome) {}
}
