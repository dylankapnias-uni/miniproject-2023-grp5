import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { 
  GetInterestsQuery,
  IGetInterestsRequest,
  IGetInterestsResponse,
  AddInterestQuery,
  IAddInterestRequest,
  IAddInterestResponse,
} from "@mp/api/interests/util";

@Injectable()
export class InterestsService {
  constructor(
    private readonly queryBus: QueryBus
  ){}

  async addInterest(
    request: IAddInterestRequest
  ): Promise<IAddInterestResponse> {
    return this.queryBus.execute<
      AddInterestQuery,
      IAddInterestResponse
    >(new AddInterestQuery(request));
  }

  async getInterests(
    request: IGetInterestsRequest
  ): Promise<IGetInterestsResponse> {
    return this.queryBus.execute<
      GetInterestsQuery,
      IGetInterestsResponse
    >(new GetInterestsQuery(request));
  }
}