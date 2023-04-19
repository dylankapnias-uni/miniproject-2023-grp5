import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import { CreateSetting } from '@mp/app/settings/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { httpsCallable, Functions } from '@angular/fire/functions';
// import { SettingsService } from '@mp/api/settings/feature';
import { IBlockUserRequest, IBlockUserResponse, ICreateSettingsRequest, IUnblockUserRequest, IUnblockUserResponse, IUpdatePrivacyRequest, IUpdatePrivacyResponse, ProfilePrivacy } from '@mp/api/settings/util';
import { SettingsApi } from './settings.api'
export interface SettingsStateModel {
    messages: string[];
}

@State<SettingsStateModel>({
    name: 'settings',
    defaults: {
        messages: []
    },
})
@Injectable()
export class SettingsState {
    //TODO Fix unblockUser
    constructor(private readonly functions: Functions, private readonly settingsApi: SettingsApi) {}
    @Action(CreateSetting)
    async createSettings(ctx: StateContext<SettingsStateModel>, {payload}: CreateSetting) {
    // const response = await httpsCallable<
    //     IBlockUserRequest,
    //     IBlockUserResponse
    // >(this.settingsApi.functions, 'blockUser')({userId: payload.id, blockedUserId: '5'});
    const response = await httpsCallable<
        IUnblockUserRequest,
        IUnblockUserResponse
    >(this.settingsApi.functions, 'unblockUser')({userId: payload.id, blockedUserId: '5'});
    console.log(response.data);
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
  static settings(state: SettingsStateModel) 
  {
    return state.messages;
  }

}