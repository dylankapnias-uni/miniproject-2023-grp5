import { SettingsRepository } from "@mp/api/settings/data-access";
import {
  GetVisibilityQuery,
  IGetProfileVisibilityResponse
} from "@mp/api/settings/util";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetVisibilityQuery)
export class GetVisibilityHandler 
implements IQueryHandler<GetVisibilityQuery, IGetProfileVisibilityResponse> {

  constructor(
    private readonly repository: SettingsRepository
  ){}

  async execute(query: GetVisibilityQuery) {

    const request = query.request;

    const settingsDoc = await this.repository.findOne(request.userId);
    const settingsData = settingsDoc.data();


    const response: IGetProfileVisibilityResponse = {
      userId: request.userId,
      profileVisibility: 
        settingsData
        ?.privacy
        .profileVisibility
    }

    return response;
  }
}