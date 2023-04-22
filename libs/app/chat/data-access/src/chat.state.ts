import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { 
    SendMessage,
    AddTime,
    GetTime,
    RemoveTime,
    GetMessages
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

  @Action(GetMessages)
  async GetMessages(ctx: StateContext<ChatStateModel>, {payload}: GetMessages) {
    //Works and catches Chat id
    ctx.patchState({
      
    });
  }

  @Action(SendMessage)
  async SendMessage(ctx: StateContext<ChatStateModel>, {payload}: SendMessage) {
    //Works and catches Chat id and outGoingMessage
    ctx.patchState({
      
    });
  }

  @Action(AddTime)
  async AddTime(ctx: StateContext<ChatStateModel>, {payload}: AddTime) {
    //Works and catches Chat id and time
    ctx.patchState({
      
    });
  }

  @Action(GetTime)
  async GetTime(ctx: StateContext<ChatStateModel>, {payload}: GetTime) {
    ctx.patchState({
      
    });
  }

  @Action(RemoveTime)
  async RemoveTime(ctx: StateContext<ChatStateModel>, {payload}: RemoveTime) {
    ctx.patchState({
      
    });
  }

  @Selector()
  static messages(state: ChatStateModel) 
  {
    return state.chatForm.model;
  }
}