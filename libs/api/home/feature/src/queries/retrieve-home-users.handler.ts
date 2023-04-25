import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HomeRepository } from '@mp/api/home/data-access';
import { IHome, IRetrieveHomeUsersResponse, RetrieveHomeUsersQuery } from '@mp/api/home/util';

@QueryHandler(RetrieveHomeUsersQuery)
export class RetrieveHomeUsersHandler implements IQueryHandler<RetrieveHomeUsersQuery, IRetrieveHomeUsersResponse> {
  constructor(private readonly repository: HomeRepository) {}

  async execute(query: RetrieveHomeUsersQuery) {
    const data: IHome=(await this.repository.getUserList(query.request.userId, query.request.filter)) as IHome;
    const resp:IRetrieveHomeUsersResponse={users:data} as IRetrieveHomeUsersResponse;
    return resp;
  }
}