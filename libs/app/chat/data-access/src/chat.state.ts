import { Injectable } from '@angular/core';
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
  IGetChatRequest,
  ISendMessageRequest,
  IChat
} from '@mp/api/chat/util';

import {
  IGetUserProfileRequest
} from '@mp/api/users/util';

import { Timestamp } from '@angular/fire/firestore';
import { ChatApi } from './chat.api';
import { Store } from '@ngxs/store';
import { IUserProfile } from '@mp/api/users/util';

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
        otherUser: IUserProfile | null | undefined;
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
          otherUser: null
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
    private store: Store
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

    console.log("API User " + payload.ouid)
    const state = ctx.getState();
    const request : IGetUserProfileRequest = {
      userId: payload.ouid
    };
    const response = await this.chatApi.getUserProfile(request);
    const rsps = response.data;
    //Works and catches Chat id
    ctx.patchState({
      chatForm: {
        ...state.chatForm,
        chatMessages: {
          ...state.chatForm.chatMessages,
          model: {
            ...state.chatForm.chatMessages.model,
            otherUser: rsps.userProfile
          }
        }
      }
      
    })
  }

  @Action(SendMessage)
  async SendMessage(ctx: StateContext<ChatStateModel>, {payload}: SendMessage) {
    console.log("ChatState.SendMessage:");
    console.log("Fuck: ", payload.uid , ", bitch - Jesse pinkman)");
    //Works(not) and catches Chat id and outGoingMessage
    payload.message.userId = payload.uid;

    const request : ISendMessageRequest = {
      userId : payload.uid,
      chatId : payload.cid,
      message : payload.message
    };
    console.log(request);
    const response = await this.chatApi.sendMessage(request);
    console.log(response);
    this.store.dispatch(new GetMessages({cid: payload.cid}));
    console.log("why not just another one there isn;t enough as isd");
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

  @Selector()
  static otherUser(state: ChatStateModel) {
    return state.chatForm.chatMessages.model.otherUser;
  }

  @Selector()
  static homeOtherUser(state: ChatStateModel){
    return state.chatForm.chatMessages.model.otherUser;
  }
}