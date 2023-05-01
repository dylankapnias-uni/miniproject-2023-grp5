import { InterestsModule as InterestsDataAccessModule } from '@mp/api/interests/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  AddInterestHandler,
  GetInterestsHandler
} from './queries';
import { InterestsService } from './interests.service'

export const QueryHandlers = [
  AddInterestHandler,
  GetInterestsHandler
];

@Module({
  imports: [CqrsModule, InterestsDataAccessModule],
  providers: [
    InterestsService,
    ...QueryHandlers,
  ],
  exports: [InterestsService]
})
export class InterestsModule{}