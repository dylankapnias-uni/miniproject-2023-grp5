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
    GetMessages,
    GetUser
 } from '@mp/app/chat/util';
 import { 
  ICreateChatRequest, 
  IGetChatRequest,
  ISendMessageRequest,
  IMessages,
  IChat
} from '@mp/api/chat/util';

import {
  IGetUserProfileRequest
} from '@mp/api/users/util';

import { Timestamp } from '@angular/fire/firestore';
import { ChatApi } from './chat.api';

export interface ChatStateModel {
  chatForm: {
    chatMessages:{
      model:{
        // chatID: string | null;
        // messages: IMessages[] | null;
        // timeAdderID: string | null;
        // timeRemaining: number | null;
        // totalTimeUsed: number | null;
        chat: IChat | null | undefined;
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
          // chatID: null,
          // messages: null,
          // timeAdderID: null,
          // timeRemaining: null,
          // totalTimeUsed: null,
          chat: null,
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

  constructor(
    private chatApi: ChatApi,
  ) {}

  @Action(GetMessages)
  async GetMessages(ctx: StateContext<ChatStateModel>, {payload}: GetMessages) {
    const request : IGetChatRequest = {
      chatId: payload.cid
    };
    const response = await this.chatApi.getChat(request);
    console.log(response);
    const rsps = response.data;
    //Works and catches Chat id
    console.log(rsps);
    ctx.patchState({
      chatForm: {
        ...ctx.getState().chatForm,
        chatMessages: {
          ...ctx.getState().chatForm.chatMessages,
          model: {
            ...ctx.getState().chatForm.chatMessages.model,
            chat: rsps.messages
          }
        }
      }
    });
  }

  @Action(GetUser)
  async GetUser(ctx: StateContext<ChatStateModel>, {payload}: GetUser) {
    const request : IGetUserProfileRequest = {
      userId: payload.ouid
    };
    const response = await this.chatApi.getUserProfile(request);
    const rsps = response.data;
    //Works and catches Chat id
    ctx.patchState({
    })
  }

  @Action(SendMessage)
  async SendMessage(ctx: StateContext<ChatStateModel>, {payload}: SendMessage) {
    console.log("ChatState.SendMessage:");
    console.log(payload);
    //Works and catches Chat id and outGoingMessage
    const request : ISendMessageRequest = {
      userId : payload.uid,
      chatId : payload.cid,
      message : payload.message
    };
    const response = await this.chatApi.sendMessage(request);
    const rsps = response.data;
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
    // const timeRemaining = state.chatForm.chatMessages.model.timeRemaining || 0;
    // const totalTimeUsed = state.chatForm.chatMessages.model.totalTimeUsed || 0;
    // if(timeRemaining <= 0){
    //   ctx.patchState({
    //     chatForm: {
    //       ...state.chatForm,
    //       status: 'TimeUp',
    //     },
    //   });
    // }
    // else{
    //   ctx.patchState({
    //     chatForm: {
    //       ...state.chatForm,
    //       chatMessages: {
    //         ...state.chatForm.chatMessages,
    //         model: {
    //           ...state.chatForm.chatMessages.model,
    //           timeRemaining: timeRemaining - 1,
    //           totalTimeUsed: totalTimeUsed + 1,
    //         },
    //       },
    //     },
    //   });
    // }
  }

  @Selector()
  static messages(state: ChatStateModel) {
    return state.chatForm.chatMessages.model.chat;
  }
}