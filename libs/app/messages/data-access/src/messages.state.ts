import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { GetMessages, SearchMessages } from '@mp/app/messages/util';
import { IMessages } from '@mp/app/chat/data-access';
import { IChat } from '@mp/app/chat/data-access';
import { Timestamp } from '@angular/fire/firestore';

export interface MessagesStateModel {
  chatForm: {
    chatMessages:{
      model:{
        chats: IChat[] | null;
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
  private static chats: IChat[] = [
    {
        ChatID: '1',
        messages: [],
        timeAdderID: null,
        timeRemaining: null,
        totalTimeUsed: null,
    },
    {
        ChatID: '2',
        messages: [],
        timeAdderID: null,
        timeRemaining: null,
        totalTimeUsed: null,
    },
    {
        ChatID: '3',
        messages: [],
        timeAdderID: '1',
        timeRemaining: 1000,
        totalTimeUsed: 500,
    },
    {
      ChatID: '3',
      messages: [],
      timeAdderID: '1',
      timeRemaining: 1000,
      totalTimeUsed: 500,
  },
  {
    ChatID: '3',
    messages: [],
    timeAdderID: '1',
    timeRemaining: 1000,
    totalTimeUsed: 500,
  },
  {
    ChatID: '3',
    messages: [],
    timeAdderID: '1',
    timeRemaining: 1000,
    totalTimeUsed: 500,
  },
  {
    ChatID: '3',
    messages: [],
    timeAdderID: '1',
    timeRemaining: 1000,
    totalTimeUsed: 500,
  },
  {
    ChatID: '3',
    messages: [],
    timeAdderID: '1',
    timeRemaining: 1000,
    totalTimeUsed: 500,
  },
  {
    ChatID: '3',
    messages: [],
    timeAdderID: '1',
    timeRemaining: 1000,
    totalTimeUsed: 500,
  },
  {
    ChatID: '3',
    messages: [],
    timeAdderID: '1',
    timeRemaining: 1000,
    totalTimeUsed: 500,
  },
  {
    ChatID: '3',
    messages: [],
    timeAdderID: '1',
    timeRemaining: 1000,
    totalTimeUsed: 500,
  },
  {
    ChatID: '3',
    messages: [],
    timeAdderID: '1',
    timeRemaining: 1000,
    totalTimeUsed: 500,
  },
  {
    ChatID: '3',
    messages: [],
    timeAdderID: '1',
    timeRemaining: 1000,
    totalTimeUsed: 500,
  },
];

  private static chat: IChat = {
    ChatID: '1',
    messages: [
      {
        message: 'Hello World!',
        time: Timestamp.now(),
        userID: '1'
      },
      {
        message: 'How are you?',
        time: Timestamp.now(),
        userID: '2'
      }
    ],
    timeAdderID: '1',
    timeRemaining: 1000,
    totalTimeUsed: 0
  };

  @Action(GetMessages)
  async GetMessages(ctx: StateContext<MessagesStateModel>, {payload}: GetMessages) {
    //Works and catches Chat id
    const state = ctx.getState();
    ctx.patchState({
      chatForm: {
        ...state.chatForm,
        chatMessages: {
          model: {
            chats: MessagesState.chats,
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
            chats: MessagesState.chats,
          },
        },
      },
    });
  }


  @Selector()
  static messages(state: MessagesStateModel): IChat[] | null {
    return state.chatForm.chatMessages.model.chats;
  }
}