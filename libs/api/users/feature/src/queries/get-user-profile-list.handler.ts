import { UserProfileRepository } from "@mp/api/users/data-access";
import {
  IGetUserProfileListResponse,
  GetUserProfileListQuery
} from "@mp/api/users/util";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetUserProfileListQuery)
export class GetUserProfileListHandler 
implements IQueryHandler<GetUserProfileListQuery, IGetUserProfileListResponse> {

  constructor(
    private readonly repository: UserProfileRepository
  ){}

  async execute(query: GetUserProfileListQuery) {

    const requestedProfiles = query.request.userIds;
    const output: IGetUserProfileListResponse = {
      profiles: [],
      failed: []
    };

    for ( let x = 0; x  < requestedProfiles.length; ++x) {
      const userId = requestedProfiles[x];
      const userProfileDoc = await this.repository.getUserProfile(userId);
      if (!userProfileDoc) {
        output.failed.push(userId);
        continue;
      }
      const docdata = userProfileDoc.data();
      if (!docdata) {
        output.failed.push(userId);
        continue;
      }
      output.profiles.push(docdata);
    }
    return output;
  }
}