import { 
  IGetInterestsRequest,
  IGetInterestsResponse,
  IAddInterestRequest,
  IAddInterestResponse,
} from "@mp/api/interests/util";
import { InterestsService } from '@mp/api/interests/feature';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

const getInterests = functions.https.onCall(
  async (
    request: IGetInterestsRequest
  ): Promise<IGetInterestsResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(InterestsService);
    return await service.getInterests(request);
  }
)

const addInterest = functions.https.onCall(
  async (
    request: IAddInterestRequest
  ): Promise<IAddInterestResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(InterestsService);
    return await service.addInterest(request);
  }
)