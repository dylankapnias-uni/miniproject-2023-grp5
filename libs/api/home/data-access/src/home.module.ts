import { Module } from '@nestjs/common';
import { HomeRepository } from './home.repository';

@Module({
  providers: [HomeRepository],
  exports: [HomeRepository],
})
export class HomeDataAccessModule {}