import { Component } from '@angular/core';
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
import { IChatReferences } from '@mp/api/chat-list/util';

@Component({
  selector: 'mp-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage {
  chats!: IChatReferences[];
  noChats!: boolean;
  profile!: IUserProfile;
  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;
  @Select(MessagesState.messages) messages$!: Observable<IChatReferences[]>;


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