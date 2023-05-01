import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { GetMessages, SearchMessages } from '@mp/app/messages/util';
import { MessagesState } from '@mp/app/messages/data-access';
import { ProfileState } from '@mp/app/profile/data-access';
import { Observable } from 'rxjs';
//import { IProfile } from '@mp/api/profiles/util';
import { IUserProfile } from '@mp/api/users/util';
import { Block } from '@mp/app/settings/util';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { IChatReferences, IMuthaFuckingAppChatList } from '@mp/api/chat-list/util';

@Component({
  selector: 'mp-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage {
  chats!: IMuthaFuckingAppChatList;
  filteredChats!: IMuthaFuckingAppChatList;
  noChats!: boolean;
  profile!: IUserProfile;
  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;
  @Select(MessagesState.messages) messages$!: Observable<IMuthaFuckingAppChatList | null>;


  constructor(private router: Router, private store: Store) {
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if (profile)
        this.profile = profile;
    });

    if(this.profile){
      this.store.dispatch(new GetMessages({uid: this.profile.userId}));
      this.messages$.subscribe((messages) => {
        if(messages){
          this.chats = messages;
          // this.noChats = this.chats.length === 0;
          this.filteredChats = this.chats;
          // if (this.chats.length > 0 && (this.chats[0].otherUser == undefined || this.chats[0].otherUser == null)) {
          //   throw new Error("fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die die");
          // }
          console.table(this.chats);
        }
      });
    }
  }

  getOtherUserProfile(users:string[]){
    const otherUser = users.filter((user) => user !== this.profile.userId);
  }


  handleChange(event:any) {
    const query = event.target.value;
    // this.store.dispatch(new SearchMessages({query}));
    //this.filteredChats = this.chats.filter(chat => chat?.otherUser?.name === query);
  }

  loadChat(ref : string | null | undefined)
  {
    this.router.navigate(['/chat/' + ref]);
    setTimeout(() => {
      window.location.reload();
    }, 200)
  }
  
  Reset(){
    //this.store.dispatch(new GetMessages({uid: '1'}));
    this.filteredChats = this.chats;
  }

  block(id:string){
    //this.store.dispatch(new Block({uid:'1', blockId: id}));
  }
  
}