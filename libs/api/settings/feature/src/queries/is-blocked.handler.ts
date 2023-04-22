import { SettingsRepository } from "@mp/api/settings/data-access";
import {
  IsBlockedQuery,
  IIsBlockedResponse
} from "@mp/api/settings/util";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";

@QueryHandler(IsBlockedQuery)
export class IsBlockedHandler 
implements IQueryHandler<IsBlockedQuery, IIsBlockedResponse> {

  constructor(
    private readonly repository: SettingsRepository
  ){}

  async execute(query: IsBlockedQuery) {

    const request = query.request;

    const settingsDoc = await this.repository.findOne(request.userId);
    const settingsData = settingsDoc.data();


    const response: IIsBlockedResponse = {
      userId: request.userId,
      blockedId: request.blockedId,
      isBlocked:
        settingsData
        ?.privacy
        .blockedAccounts
        .includes(request.blockedId)
    }

    return response;
  }
}