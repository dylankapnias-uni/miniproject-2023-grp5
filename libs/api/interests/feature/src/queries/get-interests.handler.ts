import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetInterestsQuery, IGetInterestsResponse } from '@mp/api/interests/util';
import { InterestsRepository } from '@mp/api/interests/data-access';

@QueryHandler(GetInterestsQuery)
export class GetInterestsHandler 
implements IQueryHandler<GetInterestsQuery, IGetInterestsResponse> {
  constructor(private readonly repository: InterestsRepository) {}
  async execute(query: GetInterestsQuery): Promise<IGetInterestsResponse> {
    console.log(`${GetInterestsQuery.name}`);
    const request = query.request;
    const interestsDoc =  (await this.repository.getInterests()).data();
    if (!interestsDoc) {
      throw new Error('Interests not found');
    }
    const out: IGetInterestsResponse = {
      list: []
    };
    const interestList = interestsDoc.list;
    if (request.category != undefined){
      interestList.forEach(element => {
        if (request.category == element.category) {
          out.list.push(element);
        }
      });
    }
    else {
      out.list = interestList;
    }

    return out;
  }
}

