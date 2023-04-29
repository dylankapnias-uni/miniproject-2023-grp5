import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ChatState } from '@mp/app/chat/data-access';
import { Select, Store } from '@ngxs/store';
//import { IProfile } from '@mp/api/profiles/util';
import { IUserProfile } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { Timestamp } from '@angular/fire/firestore';
import { 
  SendMessage,
  AddTime,
  GetTime,
  RemoveTime,
  GetMessages,
} from '@mp/app/chat/util';
import { IChat } from '@mp/api/chat/util';
import { IMessages } from '@mp/api/chat/util';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';

@Component({
  selector: 'mp-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  
  Chat!: IChat;
  id!: string;
  profile!: IUserProfile | null;
  outgoingMessage = '';
  color = 'bronze';
  openChatTime!: Time;
  me!: string;

  
  ionViewDidEnter() {
    const content = document.querySelector('.message');
    if (content)
      content.scrollTop = content.scrollHeight;
  }

  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;
  @Select(ChatState.messages) messages$!: Observable<IChat>;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private store: Store
    ) {
      this.store.dispatch(new SubscribeToProfile());
      this.profile$.subscribe((profile) => {
        if (profile)
          this.profile = profile;
      });
      this.id = this.route.snapshot.paramMap.get('id') as string;
      if(this.profile){
        this.store.dispatch(new GetMessages({cid:this.id}));
        this.messages$.subscribe((messages) => {
          if(messages != null){
            this.Chat = messages;
            //this.noChats = this.chats.length === 0;
          }
        });
      }
    this.startTimer();
  }

  getOtherUser(){
    if(this.Chat?.users[0] == this.profile?.userId){
      return this.Chat?.users[1];
    }

    else{
      return this.Chat?.users[0];
    }

  }

    isMe(id: string | null | undefined){
      return id===this.profile?.userId;
    }
    showid(){
      alert(this.id);
    }

    secondsToTime(seconds: number|null|undefined) {
      if(seconds){
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        let timeString = '';
        if (hours > 0)
          timeString += `${hours}:`;
        
        if (minutes < 10)
          timeString += `0${minutes}:`;
        else 
          timeString += `${minutes}:`;
        
        if (remainingSeconds < 10) 
          timeString += `0${remainingSeconds}`;
        else 
          timeString += `${remainingSeconds}`;
        return timeString;
      }
      return '00:00';
    }

    startTimer(){
      setInterval(() => {
        // if(this.Chat.timeLeft === 0)
        //   this.router.navigate(['messages']);
        // else
        //   this.Chat.timeLeft--;
        if(this.Chat){
          if(this.Chat.timeRemaining === 0){
            this.store.dispatch(new RemoveTime({cid:this.id}));
            this.router.navigate(['messages']);
          }else{
            if(this.Chat.timeRemaining)
              this.Chat.timeRemaining--;
          }
        }
      }, 1000);
    }

    addTime(minutes:number){
      //Add to database
      this.store.dispatch(new AddTime({time: minutes*60,cid:this.id}));
      //this.Chat.timeLeft+=minutes*60;
    }
    
    Report(){
      //Add functionality to report 
    }

    Block(){
      //Add functiinality to Block
    }

    send(){
      //Add functionality to send message with service
     // this.store.dispatch(new SendMessage({cid:this.id,message: this.outgoingMessage}));
  //    export interface IMessages{
  //     message: string | null | undefined;
  //     time : Timestamp;
  //     userID : string;
  // }
      const msg : IMessages = {
        message: this.outgoingMessage,
        time: Timestamp.now(),
        userId: this.me
      };
      if(this.profile)
        this.store.dispatch(new SendMessage({cid:this.id,message: msg, uid:this.profile.userId}));
        
      if(this.outgoingMessage != ''){
        const now = new Date();
        const hour = now.getHours().toString().padStart(2, '0');
        const minute = now.getMinutes().toString().padStart(2, '0');
        const time = `${hour}:${minute}`;


       // this.Chat.messages.push({from: this.me, content: this.outgoingMessage, time: time});
        this.outgoingMessage = '';
        setTimeout(() => {
          const content = document.querySelector('.message');
          if (content)
            content.scrollTop = content.scrollHeight;
        }, 100);
      }
    }

    return(){
      console.log('go back');
      //this.router.navigate(['/messages']);
    }

    navigate(){
      //fetch the user id with state or sumn
      this.router.navigate(['/other-user/2']);
    }
}