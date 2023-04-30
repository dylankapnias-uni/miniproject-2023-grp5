import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ChatState } from '@mp/app/chat/data-access';
import { Select, Store } from '@ngxs/store';
//import { IProfile } from '@mp/api/profiles/util';
import { IUserProfile } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { Timestamp } from 'firebase/firestore';
// import { Timestamp } from 'firebase-admin/firestore';
// import {Timestamp as s} from '@angular/fire/firestore';
// @angular/fire/compat/firestore Timestamp isn't real, it can't hurt you
import { 
  SendMessage,
  AddTime,
  RemoveTime,
  GetMessages,
  GetUser
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
  otherUser: IUserProfile | null = null;

  
  ionViewDidEnter() {
    const content = document.querySelector('.message');
    if (content)
      content.scrollTop = content.scrollHeight;
  }

  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;
  @Select(ChatState.messages) messages$!: Observable<IChat>;
  @Select(ChatState.otherUser) otherUser$!: Observable<IUserProfile | null>;

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
            
            this.store.dispatch(new GetUser({ouid:this.getOtherUser()}));
            this.otherUser$.subscribe((otherUser) => {
              if(otherUser != null){
                this.otherUser = otherUser;
                
              }
            });
            
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
  // fucking die typescript I hate you please kill yourself
  messageTime(time: any){
    if(time){
      // const date = new Date(time.seconds * 1000);
      // const hour = date.getHours().toString().padStart(2, '0');
      // const minute = date.getMinutes().toString().padStart(2, '0');
      // return `${hour}:${minute}`;
      // what the fuck am I even doing at this poinmt?
      //I want to fucking die
      //if(JSON.stringify(time).substr((JSON.stringify(time).indexOf(':') + 1), 9) as number)
      // Firebase Timestamps are the dumbest fucking things I've seen in my entire fucking like like holy shit
      //  where is the standardization like what the fuck even is going on I hate it and I hate myself for
      //   spending 3 hours of my life on this mmy liver is destroyed an my mental stae is in shambles please help
      //    I want to die and I want to kill the peolpe who made ehis language like holy fuck how retarded must
      //     you die please die you fucking cunt I hate you you bastard fucking asshole I hate you 
      const seconds = +(
        JSON.stringify(time)
        .substr((JSON
          .stringify(time)
          .indexOf(':') + 1)
          , 10
          )
        );//3 hours of fucking work, ffs
      // console.log(JSON.stringify(time).substr((JSON.stringify(time).indexOf(':') + 1), 9));
      //const rem: number = seconds % 86400;
      // const hours: number = Math.floor(rem / 3600);
      // const minutes: number = Math.floor((rem % 3600) / 60);
      // const remainingSeconds: number = rem % 60;
      // const timeFormat = `${hours}h ${minutes}m ${remainingSeconds}s`;
      // return timeFormat;
      const now = new Date(); // get the current date and time
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // set the time to midnight
      const target = new Date(midnight.getTime() + seconds * 1000); // add the number of seconds to the midnight time
      target.setUTCHours(target.getUTCHours() + 2);
      
      return target.toLocaleTimeString();
     // return "not fuckal bt y?";
    }
    return '00:00';
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
          if(this.Chat.timeRemaining){
            this.Chat.timeRemaining--;
          }
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
    // Add functionality to send message with service
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
    // console.log(msg.time);
    if(this.profile){
      this.store.dispatch(new SendMessage({cid:this.id,message: msg, uid:this.profile.userId}));
      this.outgoingMessage = '';
    }
    setTimeout(() => {
      const content = document.querySelector('.message');
      if (content){
        content.scrollTop = content.scrollHeight;
      }
    }, 100);
    // if(this.outgoingMessage != ''){
    //   const now = new Date();
    //   const hour = now.getHours().toString().padStart(2, '0');
    //   const minute = now.getMinutes().toString().padStart(2, '0');
    //   const time = `${hour}:${minute}`;

    //   // this.Chat.messages.push({from: this.me, content: this.outgoingMessage, time: time});
    //   this.outgoingMessage = '';

    //}
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