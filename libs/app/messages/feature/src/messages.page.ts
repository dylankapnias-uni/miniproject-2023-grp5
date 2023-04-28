import { Component } from '@angular/core';
import { Chat } from './Chat.interface';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { GetMessages, SearchMessages } from '@mp/app/messages/util';
import { MessagesState } from '@mp/app/messages/data-access';
import { ProfileState } from '@mp/app/profile/data-access';
import { Observable } from 'rxjs';
import { IChat } from '@mp/api/chat/util';
//import { IProfile } from '@mp/api/profiles/util';
import { IUserProfile } from '@mp/api/users/util';
import { Block } from '@mp/app/settings/util';
import { SubscribeToProfile } from '@mp/app/profile/util';

@Component({
  selector: 'mp-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage {
  chats!: IChat[];
  noChats!: boolean;
  profile!: IUserProfile;
  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;
  @Select(MessagesState.messages) messages$!: Observable<IChat[]>;


  constructor(private router: Router, private store: Store) {
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if (profile)
        this.profile = profile;
    });
    if(this.profile){
      this.store.dispatch(new GetMessages({uid: this.profile.userId}));
      this.messages$.subscribe((messages) => {
        if(messages != null){
          this.chats = messages;
          console.log(this.chats);
          this.noChats = this.chats.length === 0;
        }
      });
    }
  }

  getOtherUserProfile(users:string[]){
    const otherUser = users.filter((user) => user !== this.profile.userId);
  }

  openChat(chatId: string){
    //Navigate to chat page once we've figured out a way to pass the chatId to the chat page
    //console.log(chatId);
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
    this.store.dispatch(new GetMessages({uid: '1'}));
  }

  block(id:string){
    this.store.dispatch(new Block({uid:'1', blockId: id}));
  }
  
}