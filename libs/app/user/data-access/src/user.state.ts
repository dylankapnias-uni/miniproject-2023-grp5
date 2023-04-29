import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { UserApi } from './user.api';
import { IUserProfile } from '@mp/api/users/util';
import{
    IGetUserProfileRequest,
    IGetUserProfileResponse
  } from '@mp/api/users/util';
import { GetUser } from '@mp/app/user/util';

export interface UserStateModel {
    userForm: {
        user: IUserProfile | null | undefined;
    }
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        userForm: {
            user: null
        }
    }
})

@Injectable()
export class UserState {
    constructor(
        private readonly userApi: UserApi,
        private readonly store: Store
    ){}
    
    @Selector()
    static userForm(state: UserStateModel) {
        return state.userForm;
    }

    @Action(GetUser)
    async GetUser(ctx: StateContext<UserStateModel>, {payload}: GetUser) {
        const request : IGetUserProfileRequest = {
            userId: payload.userId
        }

        const response = await this.userApi.getUser(request);
        const rsps = response.data;

        console.log("Here");
        console.log(rsps);
        console.log(rsps.userProfile);

        ctx.patchState({
            userForm: {
                user: rsps.userProfile
            }

        })
    }
}