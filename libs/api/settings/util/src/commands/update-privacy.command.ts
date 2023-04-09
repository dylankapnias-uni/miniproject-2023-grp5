import { IUpdatePrivacyRequest } from "../requests";

export class UpdatePrivacyCommand {
  constructor(public readonly request: IUpdatePrivacyRequest){}
}
