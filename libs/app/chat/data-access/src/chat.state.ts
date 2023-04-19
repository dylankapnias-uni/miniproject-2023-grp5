import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { 
    SendMessage,
    AddTime,
    GetTime,
    RemoveTime
 } from '@mp/app/chat/util';

export interface ChatStateModel{
  chatForm:{
    model:{
      messages: any[] | null;
      time: number | null;
    };
    dirty: false;
    status: string;
    errors: object;
  }
}

@State<ChatStateModel>({
    name: 'chat',
    defaults: {
      chatForm:{
        model:{
          messages: null,
          time: null,
        },
        dirty: false,
        status: '',
        errors: {}
      }
    }
})
@Injectable()
export class ChatState {
  @Action(SendMessage)
  async SendMessage(ctx: StateContext<ChatStateModel>, {payload}: SendMessage) {

  }

  @Action(AddTime)
  async AddTime(ctx: StateContext<ChatStateModel>, {payload}: AddTime) {
    ctx.patchState({
      
    });
  }

  @Action(GetTime)
  async GetTime(ctx: StateContext<ChatStateModel>, {payload}: GetTime) {

  }

  @Action(RemoveTime)
  async RemoveTime(ctx: StateContext<ChatStateModel>, {payload}: RemoveTime) {

  }

  @Selector()
  static messages(state: ChatStateModel) 
  {
    return state.chatForm.model;
  }
}
