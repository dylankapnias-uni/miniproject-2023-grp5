import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { GetMessages, SearchMessages } from '@mp/app/messages/util';
import { IMessages } from '@mp/api/chat/util';
import { IChat } from '@mp/api/chat/util';
import { IChatReferences } from '@mp/api/chat-list/util';
import { Timestamp } from '@angular/fire/firestore';
import { MessagesApi } from './messages.api';
import { 
  IAddChatRequest, 
  ICreateChatListRequest,  
  IFetchChatListRequest, 
} from '@mp/api/chat-list/util';

export interface MessagesStateModel {
  chatForm: {
    chatMessages:{
      model:{
        chats: IChatReferences[] | null | undefined;
      }
    }
    dirty: false;
    status: string;
    errors: object;
  };
}

@State<MessagesStateModel>({
  name: 'messages',
  defaults: {
    chatForm: {
      chatMessages:{
        model:{
          chats: null
        }
      },
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
@Injectable()
export class MessagesState {
//   

  constructor(private messagesApi: MessagesApi) {}
  @Action(GetMessages)
  async GetMessages(ctx: StateContext<MessagesStateModel>, {payload}: GetMessages) {
    const state = ctx.getState();
    const request : IFetchChatListRequest = {
      userId: payload.uid
    }
    const response = await this.messagesApi.fetchChatList(request);
    const rsps = response.data;
    console.table(response.data);
    ctx.patchState({
      chatForm: {
        ...state.chatForm,
        chatMessages: {
          model: {
            ...state.chatForm.chatMessages.model,
            chats: rsps.chatList.chatList,
          },
        },
      },
    });
  }

  @Action(SearchMessages)
  async SearchMessages(ctx: StateContext<MessagesStateModel>, {payload}: SearchMessages) {
    //Works and catches Chat id
    const state = ctx.getState();
    ctx.patchState({
      chatForm: {
        ...state.chatForm,
        chatMessages: {
          model: {
            chats: null,
          },
        },
      },
    });
  }


  @Selector()
  static messages(state: MessagesStateModel): IChatReferences[] | null | undefined{
    return state.chatForm.chatMessages.model.chats;
  }
}