import { Component, Input } from '@angular/core';
import { IUserProfile } from '@mp/api/users/util';
import { Router } from '@angular/router';
import { IChatReferences } from '@mp/api/chat-list/util';
import { ChatState } from '@mp/app/chat/data-access';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetUser } from '@mp/app/chat/util';

@Component({
  selector: 'mp-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss']
})
export class MessageBubbleComponent {
  @Select(ChatState.otherUser) otherUser$!: Observable<IUserProfile | null>;
  @Input () chat!: IChatReferences;
  otherUser!: IUserProfile;
  constructor(private router: Router, private store: Store){
    console.error('FUCK V2:       ', this.chat)
    // if(this.chat){
      // console.log("FUCKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");
      // this.store.dispatch(new GetUser({ouid:this.chat?.otherUser}));
      // this.otherUser$.subscribe((otherUser) => {
      //   if(otherUser){
      //     this.otherUser = otherUser;
      //     console.error("Fucking die sattes: ", this.otherUser.name);
      //   }
      // });
    // }
  }
  loadChat(){
    
    if(this.chat)
      this.router.navigate([`chat/${this.chat?.chatRef}`]);
      
  }
}
