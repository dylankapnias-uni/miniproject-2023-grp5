import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import { CreateSetting } from '@mp/app/settings/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { httpsCallable, Functions } from '@angular/fire/functions';
// import { SettingsService } from '@mp/api/settings/feature';
import { ICreateSettingsRequest } from '@mp/api/settings/util';
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
    const response = await httpsCallable<ICreateSettingsRequest,any>(this.settingsApi.functions, 'createSettings')({userId: payload.id});
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