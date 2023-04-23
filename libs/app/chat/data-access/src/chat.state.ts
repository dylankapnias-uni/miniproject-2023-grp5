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
import { IMessages } from './messages.interface';
import { IChat } from './chat.interface';
import { Timestamp } from "firebase-admin/firestore";

export interface ChatStateModel {
  chatForm: {
    chatMessages:{
      model:{
        chatID: string | null;
        messages: IMessages[] | null;
        timeAdderID: string | null;
        timeRemaining: number | null;
        totalTimeUsed: number | null;
      }
    }
    dirty: false;
    status: string;
    errors: object;
  };
}

@State<ChatStateModel>({
  name: 'chat',
  defaults: {
    chatForm: {
      chatMessages:{
        model:{
          chatID: null,
          messages: null,
          timeAdderID: null,
          timeRemaining: null,
          totalTimeUsed: null,
        }
      },
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
@Injectable()
export class ChatState {

  private static chat: IChat = {
    ChatID: '1',
    messages: [
      {
        message: 'Hello World!',
        time: new Date(),
        userID: '1'
      },
      {
        message: 'How are you?',
        time: new Date(),
        userID: '2'
      }
    ],
    timeAdderID: '1',
    timeRemaining: 1000,
    totalTimeUsed: 0
  };

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
    const state = ctx.getState();
    const timeRemaining = state.chatForm.chatMessages.model.timeRemaining || 0;
    const totalTimeUsed = state.chatForm.chatMessages.model.totalTimeUsed || 0;
    if(timeRemaining <= 0){
      ctx.patchState({
        chatForm: {
          ...state.chatForm,
          status: 'TimeUp',
        },
      });
    }
    else{
      ctx.patchState({
        chatForm: {
          ...state.chatForm,
          chatMessages: {
            ...state.chatForm.chatMessages,
            model: {
              ...state.chatForm.chatMessages.model,
              timeRemaining: timeRemaining - 1,
              totalTimeUsed: totalTimeUsed + 1,
            },
          },
        },
      });
    }
  }

  @Selector()
  static messages(state: ChatStateModel) {
    return state.chatForm.chatMessages.model.messages;
  }

  @Selector()
  static timeLeft(state: ChatStateModel) {
    return state.chatForm.chatMessages.model.timeRemaining;
  }
}