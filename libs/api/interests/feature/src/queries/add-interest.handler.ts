import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AddInterestQuery, IAddInterestResponse } from '@mp/api/interests/util';
import { InterestsRepository } from '@mp/api/interests/data-access';

@QueryHandler(AddInterestQuery)
export class AddInterestHandler 
implements IQueryHandler<AddInterestQuery, IAddInterestResponse> {
  constructor(private readonly repository: InterestsRepository) {}
  async execute(query: AddInterestQuery): Promise<IAddInterestResponse> {
    console.log(`${AddInterestQuery.name}`);
    const request = query.request;
    await this.repository.addInterest(request.interest);
    const interestsDoc =  (await this.repository.getInterests()).data();
    if (!interestsDoc) {
      // should not happen because we literally just added an interest
      throw new Error('Interests not found');
    }
    const interestList = interestsDoc.list;
    const out: IAddInterestResponse = {
      list: interestList
    };

    return out;
  }
}

