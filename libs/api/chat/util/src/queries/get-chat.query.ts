import { IGetChatRequest } from '../requests';

export class GetChatQuery {
  constructor(public readonly request: IGetChatRequest) {}
}