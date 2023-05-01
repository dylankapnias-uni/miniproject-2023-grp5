import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { 
  IGetProfileVisibilityRequest,
  IGetProfileVisibilityResponse,
  IUnblockUserRequest,
  IUnblockUserResponse,
  IAddTimeRequest,
  IAddTimeResponse,
  ISubtractTimeRequest,
  ISubtractTimeResponse,
  IBlockUserRequest,
  IBlockUserResponse,
  IIsBlockedRequest,
  IIsBlockedResponse,
  IUpdatePrivacyRequest as IUpdateProfileVisibilityRequest,
  IUpdatePrivacyResponse as IUpdateProfileVisibilityResponse 
} from '@mp/api/settings/util';

import {
  ICreateUserRequest,
  ICreateUserResponse,
  IDeleteUserProfileRequest,
  IDeleteUserProfileResponse,
  IGetUserProfileRequest,
  IGetUserProfileResponse,
  IUpdateUserProfileRequest, 
  IUpdateUserProfileResponse 
} from '@mp/api/users/util';

@Injectable()
export class SettingsApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}


  async unblock(request: IUnblockUserRequest){
    return await httpsCallable<
      IUnblockUserRequest,
      IUnblockUserResponse
    >(
      this.functions,
      'unblockUser'
    )(request)
  }

  async addTime(request: IAddTimeRequest){
    return await httpsCallable<
      IAddTimeRequest,
      IAddTimeResponse
    >(
      this.functions,
      'addTime'
    )(request)
  }

  async isBlocked(request: IIsBlockedRequest){
    return await httpsCallable<
      IIsBlockedRequest,
      IIsBlockedResponse
    >(
      this.functions,
      'isBlocked'
    )(request)
  }

  async updateProfileVisibility(request: IUpdateProfileVisibilityRequest){
    return await httpsCallable<
      IUpdateProfileVisibilityRequest,
      IUpdateProfileVisibilityResponse
    >(
      this.functions,
      'updateProfileVisibility'
    )(request)
  }
    
  async subtractTime(request: ISubtractTimeRequest){
    return await httpsCallable<
      ISubtractTimeRequest,
      ISubtractTimeResponse
    >(
      this.functions,
      'subtractTime'
    )(request)
  }

  async getProfileVisibility(request: IGetProfileVisibilityRequest) {
    return await httpsCallable<
      IGetProfileVisibilityRequest,
      IGetProfileVisibilityResponse
    >(
      this.functions,
      'getProfileVisibility'
    )(request);
  }

  async blockUser(request: IBlockUserRequest){
    return await httpsCallable<
      IBlockUserRequest,
      IBlockUserResponse
    >(
      this.functions,
      'blockUser'
    )(request);
  }

  async getUserProfile(request: IGetUserProfileRequest)
  {
    return await httpsCallable<
      IGetUserProfileRequest,
      IGetUserProfileResponse
    >(
      this.functions,
      'getUserProfile'
    )(request);
  }

  async updateUserProfile(request: IUpdateUserProfileRequest){
    return await httpsCallable<
      IUpdateUserProfileRequest,
      IUpdateUserProfileResponse
    >(
      this.functions,
      'updateUserProfile'
    )(request);
  }

  async deleteUserProfile(request: IDeleteUserProfileRequest){
    return await httpsCallable<
      IDeleteUserProfileRequest,
      IDeleteUserProfileResponse
    >(
      this.functions,
      'deleteUserProfile'
    )(request);
  }

  async createUserProfile(request: ICreateUserResponse){
    return await httpsCallable<
      ICreateUserResponse,
      ICreateUserRequest
    >(
      this.functions,
      'createUserProfile'
    )(request);
  }
}
