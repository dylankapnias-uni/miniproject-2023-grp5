import { ICreateSettingsRequest } from "../requests";

export class CreateSettingsCommand {
  constructor(public readonly request: ICreateSettingsRequest){}
}
