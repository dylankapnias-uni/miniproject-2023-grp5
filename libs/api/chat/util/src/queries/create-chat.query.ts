import {ICreateChatRequest} from '../requests';
export class CreateChatQuery {
  constructor(
    public readonly request: ICreateChatRequest,
  ) {}
}