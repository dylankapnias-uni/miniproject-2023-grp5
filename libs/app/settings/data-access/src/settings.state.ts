import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { 
  IAddTimeRequest, 
  IAddTimeResponse, 
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
import { SettingsApi } from './settings.api'
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
import { IChat } from '@mp/app/chat/data-access';
import { Timestamp } from '@angular/fire/firestore';

import { ITime } from './interfaceTemp/time.interface';
import { IPrivacyDetails } from './interfaceTemp/privacy-settings.interface';
import { ProfilePrivacy } from './interfaceTemp/profile-privacy.enum';
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
    //Works and catches Chat id
    ctx.patchState({

    });
  }

  @Action(DeleteAccount)
  async DeleteAccount(ctx: StateContext<SettingsStateModel>, {payload}: DeleteAccount) {
    //Works and catches Chat id and outGoingMessage
    ctx.patchState({
      
    });
  }

  @Action(EditProfile)
  async EditProfile(ctx: StateContext<SettingsStateModel>, {payload}: EditProfile) {
    //Works and catches Chat id and time
    ctx.patchState({
      
    });
  }

  @Action(BuyTime)
  async BuyTime(ctx: StateContext<SettingsStateModel>, {payload}: BuyTime) {
    ctx.patchState({
      
    });
  }

  @Action(Unblock)
  async Unblock(ctx: StateContext<SettingsStateModel>, {payload}: Unblock) {
    //Make call to api and update state
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