import { ISettings } from "../interfaces";

export class SettingsCreatedEvent {
  constructor(public readonly settings: ISettings){}
}