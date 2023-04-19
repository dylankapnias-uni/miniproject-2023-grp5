import { Injectable } from '@angular/core';
import { UpdateAccountDetails} from '@mp/app/account/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Account } from '@mp/app/account/util';

export interface AccountStateModel {
  account: Account | null;
}

@State<AccountStateModel>({
  name: 'account',
  defaults: {
    account : null,
  }
})

@Injectable()
export class AccountState {
  @Action(UpdateAccountDetails)
  updateAccountDetails(ctx: StateContext<AccountStateModel>, { payload } : UpdateAccountDetails) {
    ctx.patchState({
      account: payload
    })
  }

  @Selector()
  static getAccountDetails(state: AccountStateModel) {
    return state.account
  }
}