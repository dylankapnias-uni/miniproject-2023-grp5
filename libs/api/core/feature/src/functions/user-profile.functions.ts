
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { UserProfileService } from '@mp/api/users/feature';
import { 
  IDeleteUserProfileRequest,
  IDeleteUserProfileResponse,
  IGetUserProfileRequest,
  IGetUserProfileResponse,
  IUpdateUserProfileRequest, 
  IUpdateUserProfileResponse 
} from '@mp/api/users/util';

export const getUserProfile = functions.https.onCall(
  async (
    request: IGetUserProfileRequest
  ): Promise<IGetUserProfileResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(UserProfileService);
    return service.getUserProfile(request);
  });

export const updateUserProfile = functions.https.onCall(
  async (
    request: IUpdateUserProfileRequest
  ): Promise<IUpdateUserProfileResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(UserProfileService);
    return service.updateUserProfile(request);
  });

export const deleteUserProfile = functions.https.onCall(
  async (
    request: IDeleteUserProfileRequest
  ): Promise<IDeleteUserProfileResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(UserProfileService);
    return service.deleteUserProfile(request);
  });