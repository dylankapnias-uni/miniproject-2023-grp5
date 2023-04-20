import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import { CreateSetting } from '@mp/app/settings/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { httpsCallable, Functions } from '@angular/fire/functions';
// import { SettingsService } from '@mp/api/settings/feature';
import { IAddTimeRequest, IAddTimeResponse, IBlockUserRequest, IBlockUserResponse, ICreateSettingsRequest, ICreateSettingsResponse, ISubtractTimeRequest, ISubtractTimeResponse, IUnblockUserRequest, IUnblockUserResponse, IUpdatePrivacyRequest, IUpdatePrivacyResponse, ProfilePrivacy } from '@mp/api/settings/util';
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
    constructor(private readonly functions: Functions, private readonly settingsApi: SettingsApi) {}
    @Action(CreateSetting)
    async createSettings(ctx: StateContext<SettingsStateModel>, {payload}: CreateSetting) {

        /*
            Very very very scuffed, please ignore :(
        */

        // Create settings document for user 5
        let response1 = await httpsCallable<
            ICreateSettingsRequest,
            ICreateSettingsResponse
        >(
            this.settingsApi.functions, 
            'createSettings'
        )({userId: '5'});
        console.log(response1.data);

        // Create settings document for user 6
        response1 = await httpsCallable<
        ICreateSettingsRequest,
        ICreateSettingsResponse
        >(
            this.settingsApi.functions, 
            'createSettings'
        )({userId: '6'});
        console.log(response1.data);

        // User 6 blocks user 5
        let response2 = await httpsCallable<
            IUnblockUserRequest,
            IUnblockUserResponse
        >(
            this.settingsApi.functions, 
            'blockUser'
        )({userId: payload.id, blockedUserId: '5'});
        console.log(response2.data);

        // User 6 unblocks user 5
        response2 = await httpsCallable<
            IUnblockUserRequest,
            IUnblockUserResponse
        >(
            this.settingsApi.functions, 
            'unblockUser'
        )({userId: payload.id, blockedUserId: '5'});
        console.log(response2.data);
        
        // User 5 buys 10000 time
        let response3 = await httpsCallable<
            IAddTimeRequest,
            IAddTimeResponse
        >(
            this.settingsApi.functions,
            'addTime'
        )({
            userId: '5', 
            purchaseAmount: 10000
        });
        console.log(response3);

        // User 6 buys 20000 time
        response3 = await httpsCallable<
            IAddTimeRequest,
            IAddTimeResponse
        >(
            this.settingsApi.functions,
            'addTime'
        )({
            userId: '6', 
            purchaseAmount: 20000
        });
        console.log(response3);

        // User 6 uses 4000 time
        let response4 = await httpsCallable<
            ISubtractTimeRequest,
            ISubtractTimeResponse
        >(
            this.settingsApi.functions,
            'subtractTime'
        )({
            userId: '6', 
            amount: 4000
        });
        console.log(response4);

        // User 6 uses 200 time
        response4 = await httpsCallable<
            ISubtractTimeRequest,
            ISubtractTimeResponse
        >(
            this.settingsApi.functions,
            'subtractTime'
        )({
            userId: '5', 
            amount: 200
        });
        console.log(response4);
        
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