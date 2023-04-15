import { IMessages } from './messages.interface';

export interface IChat {
    messages: IMessages[] | null | undefined;
    timeAdderID: string | null | undefined;
    timeRemaining : number | null | undefined;
    totalTimeUsed : number | null | undefined;
}