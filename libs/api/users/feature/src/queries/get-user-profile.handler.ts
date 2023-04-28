import { UserProfileRepository } from "@mp/api/users/data-access";
import {
  GetUserProfileQuery,
  IGetUserProfileResponse
} from "@mp/api/users/util";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetUserProfileQuery)
export class GetUserProfileHandler 
implements IQueryHandler<GetUserProfileQuery, IGetUserProfileResponse> {

  constructor(
    private readonly repository: UserProfileRepository
  ){}

  async execute(query: GetUserProfileQuery) {

    const request = query.request;

    const userProfileDoc = await this.repository.getUserProfile(request.userId);
    return { userProfile: userProfileDoc?.data() };
  }
}