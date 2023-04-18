import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { GetMessages, SearchMessages } from '@mp/app/messages/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';


export interface MessagesStateModel {
    messages: string[];
}

@State<MessagesStateModel>({
    name: 'messages',
    defaults: {
        messages: []
    },
})
@Injectable()
export class MessagesState {
    private static chats: any[] = [
        {
          id: '1',
          unread: true,
          name: 'John',
        },
        {
          id: '2',
          unread: false,
          name: 'Jane',
        },
        {
          id: '3',
          unread: false,
          name: 'Joe',
        },
        {
          id: '1',
          unread: true,
          name: 'John',
        },
        {
          id: '2',
          unread: false,
          name: 'Jane',
        },
        {
          id: '3',
          unread: false,
          name: 'Joe',
        },
        {
          id: '1',
          unread: true,
          name: 'John',
        },
        {
          id: '2',
          unread: false,
          name: 'Jane',
        },
        {
          id: '3',
          unread: false,
          name: 'Joe',
        },
        {
          id: '1',
          unread: true,
          name: 'John',
        },
        {
          id: '2',
          unread: false,
          name: 'Jane',
        },
        {
          id: '3',
          unread: false,
          name: 'Joe',
        },
        {
          id: '1',
          unread: true,
          name: 'John',
        },
        {
          id: '2',
          unread: false,
          name: 'Jane',
        },
        {
          id: '3',
          unread: false,
          name: 'Joe',
        },
        {
          id: '1',
          unread: true,
          name: 'John',
        },
        {
          id: '2',
          unread: false,
          name: 'Jane',
        },
        {
          id: '3',
          unread: false,
          name: 'Joe',
        },
      ];
    constructor() {}
  @Action(GetMessages)
  async GetMessages(ctx: StateContext<MessagesStateModel>) {
    //Query api here
    //this.api.getChats()
    ctx.patchState({
        messages: MessagesState.chats
    })
  }

  @Action(SearchMessages)
  async SearchMessages(ctx: StateContext<MessagesStateModel>, {payload}: SearchMessages) {
    //Query api here
    const Filtered = MessagesState.chats.filter((chat) => chat.name.toLowerCase().includes(payload.query.toLowerCase()));
    ctx.patchState({
        messages: Filtered
    })
  }

  @Selector()
  static messages(state: MessagesStateModel) 
  {
    return state.messages
  }

}
