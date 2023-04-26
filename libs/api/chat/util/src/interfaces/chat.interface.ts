import { IMessages } from './messages.interface';
export interface IChat {
    chatID : string;
    messages: IMessages[] | null | undefined;
    timeAdderID: string | null | undefined;
    timeRemaining : number | null | undefined;
    totalTimeUsed : number | null | undefined;
    users: string[];
}