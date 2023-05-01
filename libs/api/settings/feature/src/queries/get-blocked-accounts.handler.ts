import { 
  QueryHandler, 
  IQueryHandler 
} from "@nestjs/cqrs";
import { SettingsRepository } from "@mp/api/settings/data-access";
import { 
  GetBlockedAccountsQuery,
  IGetBlockedAccountsResponse
} from "@mp/api/settings/util";

@QueryHandler(GetBlockedAccountsQuery)
export class GetBlockedAccountsHandler
implements IQueryHandler<GetBlockedAccountsQuery, IGetBlockedAccountsResponse> {

  constructor(
    private readonly repository: SettingsRepository
  ){}

  async execute(query: GetBlockedAccountsQuery) {

    const request = query.request;

    const blockedUsers = await this.repository.getBlockedAccounts(request.userId);

    const response: IGetBlockedAccountsResponse = {
      userId: request.userId,
      blocked: blockedUsers
    }

    return response;
  }
}
