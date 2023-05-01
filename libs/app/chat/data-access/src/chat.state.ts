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
  IChat,
  IAddTimeRequest,
  ISubtractTimeRequest,
  IMessages,
} from '@mp/api/chat/util';

import {
  IGetUserProfileRequest
} from '@mp/api/users/util';

// import { Timestamp } from '@angular/fire/firestore';
import { ChatApi } from './chat.api';
import { Store } from '@ngxs/store';
import { IUserProfile } from '@mp/api/users/util';

export interface ChatStateModel {
  chatForm: {
    chatMessages:{
      model:{
        actualFuckingChat:{
          chatID: string | null | undefined;
          messages: IMessages[] | null | undefined;
          timeAdderID: string | null | undefined;
          timeRemaining: number | null | undefined;
          totalTimeUsed: number | null | undefined;
          users:string[] | null | undefined
        }
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
          actualFuckingChat:{
            chatID: null,
            messages: null,
            timeAdderID: null,
            timeRemaining: null,
            totalTimeUsed: null,
            users:null
            // please let me join I have fomo
          },
          otherUser: null
        },
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
            actualFuckingChat:{
              chatID: rsps.messages?.chatId,
              messages: rsps.messages?.messages,
              timeAdderID: rsps.messages?.timeAdderId,
              timeRemaining: rsps.messages?.timeRemaining,
              totalTimeUsed: rsps.messages?.totalTimeUsed,
              users:rsps.messages?.users
            }
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
    const state = ctx.getState();
    //Works(not) and catches Chat id and outGoingMessage
    payload.message.userId = payload.uid;

    const request : ISendMessageRequest = {
      userId : payload.uid,
      chatId : payload.cid,
      message : payload.message
    };
    const response = await this.chatApi.sendMessage(request);
    console.table(state.chatForm.chatMessages.model.actualFuckingChat.messages);
    ctx.patchState({
      chatForm: {
        ...state.chatForm,
        chatMessages: {
          ...state.chatForm.chatMessages,
          model: {
            ...state.chatForm.chatMessages.model,
            actualFuckingChat:{
              chatID: payload.cid,
              messages: state.chatForm.chatMessages.model.actualFuckingChat.messages,
              timeAdderID: state.chatForm.chatMessages.model.actualFuckingChat.timeAdderID,
              timeRemaining: state.chatForm.chatMessages.model?.actualFuckingChat.timeRemaining,
              totalTimeUsed: state.chatForm.chatMessages.model?.actualFuckingChat.totalTimeUsed,
              users:state.chatForm.chatMessages.model.actualFuckingChat.users
            },
          },
        },
      },
    });
    // this.store.dispatch(new GetMessages({cid: payload.cid}));

    console.log("why not just another one there isn;t enough as isd");
  }

  @Action(AddTime)
  async AddTime(ctx: StateContext<ChatStateModel>, {payload}: AddTime) {
    const request : IAddTimeRequest = {
      chatId : payload.cid,
      time : payload.time,
    }
    this.chatApi.addTime(request);
    const state = ctx.getState();
    let FuckThisShitImOutIHaveLoadsheddingElectricBoogaloo;
    let FuckThisShitV3;
    if(state.chatForm.chatMessages.model?.actualFuckingChat.timeRemaining)
      FuckThisShitImOutIHaveLoadsheddingElectricBoogaloo = state.chatForm.chatMessages.model?.actualFuckingChat.timeRemaining + payload.time;
    if(state.chatForm.chatMessages.model?.actualFuckingChat.totalTimeUsed)
      FuckThisShitV3 = state.chatForm.chatMessages.model?.actualFuckingChat.totalTimeUsed;
    
    ctx.patchState({
      chatForm: {
        ...state.chatForm,
        chatMessages: {
          ...state.chatForm.chatMessages,
          model: {
            ...state.chatForm.chatMessages.model,
            actualFuckingChat:{
              chatID: payload.cid,
              messages: state.chatForm.chatMessages.model.actualFuckingChat.messages,
              timeAdderID: state.chatForm.chatMessages.model.actualFuckingChat.timeAdderID,
              timeRemaining: FuckThisShitImOutIHaveLoadsheddingElectricBoogaloo,
              totalTimeUsed: FuckThisShitV3,
              users:state.chatForm.chatMessages.model.actualFuckingChat.users
            },
          },
        },
      },
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
    const request : ISubtractTimeRequest = {
      chatId : payload.cid,
      time : payload.time,
    }

    this.chatApi.subtractTime(request);
    // let FuckThisShitImOutIHaveLoadsheddingElectricBoogaloo;
    // let FuckThisShitV3;
    
    // if(state.chatForm.chatMessages.model?.actualFuckingChat.timeRemaining)
    //   FuckThisShitImOutIHaveLoadsheddingElectricBoogaloo = state.chatForm.chatMessages.model?.actualFuckingChat.timeRemaining - payload.time;
    // if(state.chatForm.chatMessages.model?.actualFuckingChat.totalTimeUsed)
    //   FuckThisShitV3 = state.chatForm.chatMessages.model?.actualFuckingChat.totalTimeUsed + -payload.time;
    
    // console.error("OLD TIME: ", state.chatForm.chatMessages.model?.actualFuckingChat.timeRemaining);
    // console.error("This is the new fucking time: ", FuckThisShitImOutIHaveLoadsheddingElectricBoogaloo);
    
    ctx.patchState({
      chatForm: {
        ...state.chatForm,
        chatMessages: {
          ...state.chatForm.chatMessages,
          model: {
            ...state.chatForm.chatMessages.model,
            actualFuckingChat:{
              chatID: payload.cid,
              messages: state.chatForm.chatMessages.model.actualFuckingChat.messages,
              timeAdderID: state.chatForm.chatMessages.model.actualFuckingChat.timeAdderID,
              timeRemaining: state.chatForm.chatMessages.model?.actualFuckingChat.timeRemaining,
              totalTimeUsed: state.chatForm.chatMessages.model?.actualFuckingChat.totalTimeUsed,
              users:state.chatForm.chatMessages.model.actualFuckingChat.users
            },
          },
        },
      },
    });
  }

  @Selector()
  static messages(state: ChatStateModel) {
    return state.chatForm.chatMessages.model.actualFuckingChat;
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