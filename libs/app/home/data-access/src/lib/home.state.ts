import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { 
    SwipeAccept,
    SwipeReject,
    FilterCards
 } from '@mp/app/home/util';

export interface HomeStateModel{
  home:{
    model:{
      users: any[] | null;
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

  @Action(SwipeAccept)
  async SwipeAccept(ctx: StateContext<HomeStateModel>, {payload}: SwipeAccept) {
    //Works and catches Chat id
    ctx.patchState({
      
    });
  }

  @Action(SwipeReject)
  async SwipeReject(ctx: StateContext<HomeStateModel>, {payload}: SwipeReject) {
    //Works and catches Chat id and outGoingMessage
    ctx.patchState({
      
    });
  }

  @Action(FilterCards)
  async FilterCards(ctx: StateContext<HomeStateModel>, {payload}: FilterCards) {
    //Works and catches Chat id and time
    ctx.patchState({
      
    });
  }


  @Selector()
  static home(state: HomeStateModel) 
  {
    return state.home.model;
  }
}