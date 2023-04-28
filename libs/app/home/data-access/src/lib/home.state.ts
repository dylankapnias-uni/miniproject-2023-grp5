import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { 
    SwipeAccept,
    SwipeReject,
    FilterCards,
    GetCards
 } from '@mp/app/home/util';
import { IUserProfile } from '@mp/api/users/util';
import { 
  IAcceptUserRequest,
  IAcceptUserResponse,
  IRejectUserRequest,
  IRejectUserResponse,
  ICreateUserHomeResponse,
  ICreateUserHomeRequest,
  IRetrieveHomeUsersResponse,
  IRetrieveHomeUsersRequest,
  IUserMatch
 } from '@mp/api/home/util';

import { HomeApi } from './home.api';

export interface HomeStateModel{
  home:{
    model:{
      users: IUserMatch[] | null;
    };
    dirty: false;
    status: string;
    errors: object;
  }
}

@State<HomeStateModel>({
    name: 'home',
    defaults: {
      home:{
        model:{
          users: null,
        },
        dirty: false,
        status: '',
        errors: {}
      }
    }
})
@Injectable()
export class HomeState {
  constructor(public homeApi: HomeApi) {};
  @Action(SwipeAccept)
  async SwipeAccept(ctx: StateContext<HomeStateModel>, {payload}: SwipeAccept) {
    const request: IAcceptUserRequest = {
      userId: payload.userId,
      swipedUserId : payload.swipedUserId,
    };

    const response = await this.homeApi.acceptUser(request);
    const rsps = response.data;
    ctx.patchState({
      
    });
  }

  @Action(SwipeReject)
  async SwipeReject(ctx: StateContext<HomeStateModel>, {payload}: SwipeReject) {
    const request: IRejectUserRequest = {
      userId: payload.userId,
      swipedUserId : payload.swipedUserId
    };

    const response = await this.homeApi.rejectUser(request);
    const rsps = response.data;
    ctx.patchState({
      
    });
  }

  @Action(FilterCards)
  async FilterCards(ctx: StateContext<HomeStateModel>, {payload}: FilterCards) {
    //Works and catches Chat id and time
    ctx.patchState({
      
    });
  }

  @Action(GetCards)
  async GetCards(ctx: StateContext<HomeStateModel>, {payload}: GetCards) {
    
    const request: IRetrieveHomeUsersRequest = {
      userId: payload.uid,
      filter: null
    };

    const response = await this.homeApi.retrieveHomeUsers(request);
    const rsps = response.data;
    if (rsps.users.userList === undefined) {
      throw new Error('Unlovable');
    }
    ctx.patchState({
      home:{
        model:{
          users: rsps.users.userList,
        },
        dirty: false,
        status: '',
        errors: {}
      }
    });
  }
 


  @Selector()
  static home(state: HomeStateModel) {
    return state.home.model;
  }
}