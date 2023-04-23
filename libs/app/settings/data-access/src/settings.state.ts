import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import {
    UpdateAccount,
    DeleteAccount,
    EditProfile,
    BuyTime,
    Unblock,
    GetBlocked
}
from '@mp/app/settings/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { IBlockedAccounts } from './interfaceTemp/blocked-accounts.interface';
import { ISettings } from './interfaceTemp/settings.interface';
import { IPrivacyDetails } from './interfaceTemp/privacy-settings.interface';


export interface SettingsStateModel {
    BlockedAccountsForm:{
        model:{
            blockedAccounts: IBlockedAccounts | null;
        },
        dirty: false;
        status: string;
        errors: object;
    };
    SettingsForm:{
        model:{
            settings: ISettings | null;
        };
        dirty: false;
        status: string;
        errors: object;
    };
    PrivacySettingsForm:{
        model:{
            privacySettings: IPrivacyDetails | null;
        };
        dirty: false;
        status: string;
        errors: object;
    };
}

@State<SettingsStateModel>({
    name: 'settings',
    defaults: {
        BlockedAccountsForm:{
            model:{
                blockedAccounts: null
            },
            dirty: false,
            status: '',
            errors: {},
        },
        SettingsForm:{
            model:{
                settings: null
            },
            dirty: false,
            status: '',
            errors: {},
        },
        PrivacySettingsForm:{
            model:{
                privacySettings: null
            },
            dirty: false,
            status: '',
            errors: {},
        },
    },
})
@Injectable()
export class SettingsState {

   
    constructor() {}
    @Action(UpdateAccount)
    async UpdateAccount(ctx: StateContext<SettingsState>, {payload}: UpdateAccount) {
        //Query api here
        //this.api.getChats()
        ctx.patchState({

        })
    }

    @Action(DeleteAccount)
    async DeleteAccount(ctx: StateContext<SettingsState>, {payload}: DeleteAccount) {
        //Query api here
        ctx.patchState({

        })
    }

    @Action(BuyTime)
    async BuyTime(ctx: StateContext<SettingsState>, {payload}: BuyTime) {
        //Query api here
        ctx.patchState({

        })
    }

    @Action(EditProfile)
    async EditProfile(ctx: StateContext<SettingsState>, {payload}: EditProfile) {
        //Query api here
        ctx.patchState({

        })
    }

    @Action(Unblock)
    async Unblock(ctx: StateContext<SettingsState>, {payload}: Unblock) {
        //Query api here
        ctx.patchState({

        })
    }

    @Action(GetBlocked)
    async GetBlocked(ctx: StateContext<SettingsState>, { payload }: GetBlocked) {
        //Query api here
        ctx.patchState({

        })
    }

    @Selector()
    static settings(state: SettingsState) 
    {
        //return state.SettingsForm.model.settings;
    }

    @Selector()
    static blocked(state: SettingsState) 
    {
        //return state.BlockedAccountsForm.model.blockedAccounts;
    }

    @Selector()
    static privacy(state: SettingsState) 
    {
        //return state.PrivacySettingsForm.model.privacySettings;
    }

}