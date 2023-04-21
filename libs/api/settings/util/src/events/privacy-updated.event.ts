import { IUpdatePrivacyRequest } from "../requests";
export class PrivacyUpdatedEvent {
  constructor(public readonly request: IUpdatePrivacyRequest){}
}