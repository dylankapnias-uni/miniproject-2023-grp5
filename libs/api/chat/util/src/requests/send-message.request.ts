import { IMessages } from "../interfaces";

export interface ISendMessageRequest {
    userId: string,
    chatId: string,
    message:IMessages
  }
  