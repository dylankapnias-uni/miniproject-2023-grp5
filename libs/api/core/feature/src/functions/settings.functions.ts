import { 
  IAddTimeRequest, 
  IAddTimeResponse, 
  IBlockUserRequest, 
  IBlockUserResponse, 
  ICreateSettingsRequest, 
  IUnblockUserRequest, 
  IUnblockUserResponse, 
  IUpdatePrivacyRequest, 
  IUpdatePrivacyResponse 
} from '@mp/api/settings/util';
import { SettingsService } from '@mp/api/settings/feature';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const updateProfileVisibility = functions.https.onCall(
  async (
    request: IUpdatePrivacyRequest
  ): Promise<IUpdatePrivacyResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SettingsService);
    return service.updatePrivacy(request);
  }
);

export const blockUser = functions.https.onCall(
  async (
    request: IBlockUserRequest
  ): Promise<IBlockUserResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SettingsService);
    return service.blockUser(request);
  }
);

export const unblockUser = functions.https.onCall(
  async (
    request: IUnblockUserRequest
  ): Promise<IUnblockUserResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SettingsService);
    return service.unblockUser(request);
  }
);

export const addTime = functions.https.onCall(
  async (
    request: IAddTimeRequest
  ): Promise<IAddTimeResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SettingsService);
    return service.addTime(request);
  }
);

// for testing only
export const createSettings = functions.https.onCall(
  async (
    request: ICreateSettingsRequest,
    any
  ): Promise<any> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SettingsService);
    return service.createSettings(request);
  }
)
