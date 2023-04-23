import { Component } from '@angular/core';
import { Chat } from '../Chat.interface';
import { Router } from '@angular/router';
import { Store, Selector, Select } from '@ngxs/store';
import { GetMessages, SearchMessages } from '@mp/app/messages/util';
import { MessagesState } from '@mp/app/messages/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'mp-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage {
  chats!: any;
  noChats!: boolean;
  //@Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @Select(MessagesState.messages) messages$!: Observable<string[]>;


  constructor(private router: Router, private store: Store) {
    this.store.dispatch(new GetMessages())
    this.messages$.subscribe((messages) => {
      if(messages != null){
        this.chats = messages;
        this.noChats = this.chats.length === 0;
      }
    });
  }

  openChat(chatId: string){
    //Navigate to chat page once we've figured out a way to pass the chatId to the chat page
    this.router.navigate([`/chat/${chatId}`]);
    setTimeout(() => {
      window.location.reload();
    }, 100)
  }

  handleChange(event:any) {
    const query = event.target.value;
    this.store.dispatch(new SearchMessages({query}));
  }

  Reset(){
    this.store.dispatch(new GetMessages());
  }
  
}