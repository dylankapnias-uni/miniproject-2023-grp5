import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HomeRepository } from '@mp/api/home/data-access';
import { RetrieveHomeUsersQuery } from '@mp/api/home/util';

@QueryHandler(RetrieveHomeUsersQuery)
export class RetrieveHomeUsersHandler implements IQueryHandler<RetrieveHomeUsersQuery> {
  constructor(private readonly repository: HomeRepository) {}

  async execute(query: RetrieveHomeUsersQuery) {
    return this.repository.getUserList(query.userId);
  }
}