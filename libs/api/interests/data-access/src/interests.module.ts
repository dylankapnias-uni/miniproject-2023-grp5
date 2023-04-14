import { Module } from '@nestjs/common';
import { InterestsRepository } from './interests.repository';
@Module({
    providers: [InterestsRepository],
    exports: [InterestsRepository],
  })
  export class InterestsModule {}