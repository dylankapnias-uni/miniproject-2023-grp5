import { IGetInterestsRequest } from '../requests';

export class GetInterestsQuery {
  constructor(public readonly request: IGetInterestsRequest) {}
}