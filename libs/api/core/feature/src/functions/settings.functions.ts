import { 
  IAddTimeRequest, 
  IAddTimeResponse, 
  IBlockUserRequest, 
  IBlockUserResponse, 
  ICreateSettingsRequest, 
  ICreateSettingsResponse, 
  IGetBlockedAccountsRequest, 
  IGetBlockedAccountsResponse, 
  IGetProfileVisibilityRequest, 
  IGetProfileVisibilityResponse, 
  IIsBlockedRequest, 
  IIsBlockedResponse, 
  ISubtractTimeRequest, 
  ISubtractTimeResponse, 
  IUnblockUserRequest, 
  IUnblockUserResponse, 
  IUpdatePrivacyRequest as IUpdateProfileVisibilityRequest, 
  IUpdatePrivacyResponse as IUpdateProfileVisibilityResponse 
} from '@mp/api/settings/util';
import { SettingsService } from '@mp/api/settings/feature';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const updateProfileVisibility = functions.https.onCall(
  async (
    request: IUpdateProfileVisibilityRequest
  ): Promise<IUpdateProfileVisibilityResponse> => {
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

export const getBlockedAccounts = functions.https.onCall(
  async (
    request: IGetBlockedAccountsRequest
  ): Promise<IGetBlockedAccountsResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SettingsService);
    return service.getBlockedAccounts(request);
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

export const subtractTime = functions.https.onCall(
  async (
    request: ISubtractTimeRequest
  ): Promise<ISubtractTimeResponse> => {
    console.warn("Do not call this function");
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SettingsService);
    return service.subtractTime(request);
  }
);

export const isBlocked = functions.https.onCall(
  async (
    request: IIsBlockedRequest
  ): Promise<IIsBlockedResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SettingsService);
    return service.isBlocked(request);
  }
)

export const getProfileVisibility = functions.https.onCall(
  async (
    request: IGetProfileVisibilityRequest
  ): Promise<IGetProfileVisibilityResponse> => {
    const app = NestFactory.createApplicationContext(CoreModule);
    const service = (await app).get(SettingsService);
    return await service.getVisibility(request);
  }
)
// for testing only
// TODO remove
export const createSettings = functions.https.onCall(
  async (
    request: ICreateSettingsRequest
  ): Promise<ICreateSettingsResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SettingsService);
    return service.createSettings(request);
  }
)

//TODO getBlockedAccounts