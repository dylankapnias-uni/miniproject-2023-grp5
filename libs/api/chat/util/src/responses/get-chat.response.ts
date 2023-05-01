import { IChat } from "../interfaces";

export interface IGetChatResponse {
  messages: IChat | null | undefined;
}