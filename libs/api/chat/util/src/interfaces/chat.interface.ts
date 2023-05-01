import { IMessages } from './messages.interface';
export interface IChat {
    chatId: string,
    messages: IMessages[] | null | undefined,
    timeAdderId: string | null | undefined,
    timeRemaining: number | null | undefined,
    totalTimeUsed: number | null | undefined,
    users: string[]
}