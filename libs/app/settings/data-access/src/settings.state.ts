import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { 
  IAddTimeRequest, 
  IBlockUserRequest, 
  IBlockUserResponse, 
  ICreateSettingsRequest, 
  ICreateSettingsResponse, 
  IGetProfileVisibilityRequest, 
  IGetProfileVisibilityResponse, 
  IIsBlockedRequest, 
  IIsBlockedResponse, 
  ISubtractTimeRequest, 
  ISubtractTimeResponse, 
  IUnblockUserRequest, 
  IUnblockUserResponse, 
  IUpdatePrivacyRequest, 
  IUpdatePrivacyResponse,
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

import { SettingsApi } from './settings.api'
import {
    UpdateAccount,
    DeleteAccount,
    EditProfile,
    BuyTime,
    Unblock,
    GetBlocked,
    CreateSetting
}
from '@mp/app/settings/util';

import { IUserProfile } from '@mp/api/users/util';

import { IChat } from '@mp/api/chat/util';
import { Timestamp } from '@angular/fire/firestore';

import { ITime, IPrivacyDetails, ProfilePrivacy } from '@mp/api/settings/util';
import { httpsCallable } from '@angular/fire/functions';


export interface SettingsStateModel {
  settingsForm:{
    settings:{
        model:{
            userId: string | null;
            privacy: IPrivacyDetails | null;
            time: ITime | null;
        }
    }
    dirty:false;
    status: string;
    errors: object;
  };
  blockedForm:{
    blocked:{
        model:{
            blockedUsers: string[] | null;
        }
    }
    dirty: false;
    status: string;
    errors: object;
  };
  privacyForm:{
    privacy:{
        model:{
            profileVisibility: ProfilePrivacy | null;
        }
    }
    dirty: false;
    status: string;
    errors: object;
  };
}

@State<SettingsStateModel>({
    name: 'settings',
    defaults: {
      settingsForm:{
          settings:{
            model:{
                userId: null,
                privacy: null,
                time: null,
            }
          },
          dirty: false,
          status: '',
          errors: {} ,       
      },
      blockedForm:{
        blocked:{
            model:{
                blockedUsers: null,
            }
        },
        dirty: false,
        status: '',
        errors: {},
      },
      privacyForm:{
        privacy:{
            model:{
                profileVisibility: null,
            }
        },
        dirty: false,
        status: '',
        errors: {},
      },
    }
})
  
@Injectable()
export class SettingsState {

  /*private static chat: IChat = {
    ChatID: '1',
    messages: [
      {
        message: 'Hello World!',
        time: Timestamp.now(),
        userID: '1'
      },
      {
        message: 'How are you?',
        time: Timestamp.now(),
        userID: '2'
      }
    ],
    timeAdderID: '1',
    timeRemaining: 1000,
    totalTimeUsed: 0
  };*/

  constructor(public settingsApi: SettingsApi){};

  @Action(UpdateAccount)
  async UpdateAccount(ctx: StateContext<SettingsStateModel>, {payload}: UpdateAccount) {

    const request : IUpdateUserProfileRequest = {
      userProfile : {
        userId: payload.uid,
        email: payload.email,
        name: payload.name,
        profilePicture: payload.profilePicture,
        phoneNumber: payload.phoneNumber,
        customClaims: payload.customClaims,
        age: payload.age,
        bio: payload.bio,
        dob: payload.dob,
        gender: payload.gender,
        interests: payload.interests,
        sexuality: payload.sexuality,
        time: payload.time,
        posts: payload.posts
      }
    };
    const response = await this.settingsApi.updateUserProfile(request);
    const rsps = response.data;
    ctx.patchState({
      
    });
  }

  @Action(DeleteAccount)
  async DeleteAccount(ctx: StateContext<SettingsStateModel>, {payload}: DeleteAccount) {
    const request : IDeleteUserProfileRequest = {
      userId: payload.uid,
    };

    const response = await this.settingsApi.deleteUserProfile(request);
    const rsps = response.data;
    ctx.patchState({
      
    });
  }

  @Action(EditProfile)
  async EditProfile(ctx: StateContext<SettingsStateModel>, {payload}: EditProfile) {
    //Make call to api and update state
    console.log("Update Made: " + payload);
    const tempRequest : IUserProfile = {
      userId: payload.uid,
      email: payload.email,
      name: payload.name,
      profilePicture: payload.profilePicture,
      phoneNumber: payload.phoneNumber,
      customClaims: payload.customClaims,
      age: payload.age,
      bio: payload.bio,
      dob: payload.dob,
      gender: payload.gender,
      interests: payload.interests,
      sexuality: payload.sexuality,
      time: payload.time,
      posts: payload.posts
    };

    const request : IUpdateUserProfileRequest = {
      userProfile : tempRequest
    };
    const response = await this.settingsApi.updateUserProfile(request);
    const rsps = response.data;
    ctx.patchState({
      
    });
  }

  @Action(BuyTime)
  async BuyTime(ctx: StateContext<SettingsStateModel>, {payload}: BuyTime) {
    const request : IAddTimeRequest = {
      userId: payload.uid,
      purchaseAmount: payload.time
    };
    const response = await this.settingsApi.addTime(request);
    const rsps = response.data;
    ctx.patchState({
      
    });
  }

  @Action(Unblock)
  async Unblock(ctx: StateContext<SettingsStateModel>, {payload}: Unblock) {
    //Make call to api and update state
    const request : IUnblockUserRequest = {
      userId: payload.uid,
      blockedUserId: payload.unblockId,
    };
    const response = await this.settingsApi.unblock(request);
    const rsps = response.data;
  }

  @Action(GetBlocked)
  async GetBlocked(ctx: StateContext<SettingsStateModel>, {payload}: GetBlocked) {
    console.log("Get blocked users");
    ctx.patchState({
        blockedForm:{
            blocked:{
                model:{
                    blockedUsers: ['1','2','3'],//Make call to api
                }
            },
            dirty: false,
            status: 'Fetched',
            errors: {},
        }
    });
  }
  @Action(CreateSetting)
    async createSettings(ctx: StateContext<SettingsStateModel>, {payload}: CreateSetting) {
        /*this.srvc.createSettings({userId: '1234'}).then((data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
        });*/
        ctx.patchState({
            //messages: MessagesState.chats
        })
    }

  @Selector()
  static settings(state: SettingsStateModel) {
    return state.settingsForm.settings.model;
  }


  @Selector()
  static privacy(state: SettingsStateModel) {
    return state.privacyForm.privacy.model.profileVisibility;
  }

  @Selector()
  static blocked(state: SettingsStateModel) {
    return state.blockedForm.blocked.model.blockedUsers;
  }
}