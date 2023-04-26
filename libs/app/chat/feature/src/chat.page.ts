import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { chat } from './chat.interface';
import { ChatState } from '@mp/app/chat/data-access';
import { Select, Store } from '@ngxs/store';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { 
  SendMessage,
  AddTime,
  GetTime,
  RemoveTime,
  GetMessages
} from '@mp/app/chat/util';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';

@Component({
  selector: 'mp-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  @Select(ChatState.messages) messages$!: Observable<string[]>;
  Chat!: chat;
  id!: any;
  me!: string;
  outgoingMessage = '';
  color = 'bronze';
  openChatTime!: Time;

  
  ionViewDidEnter() {
    const content = document.querySelector('.message');
    if (content)
      content.scrollTop = content.scrollHeight;
  }
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private store: Store
    ) {
      this.store.dispatch(new SubscribeToProfile());
      this.profile$.subscribe((profile) => {
        if (profile)
          this.me = profile.userId;
      });

      //Subscribe to chat state after getting id from route
      //Get id from route 
      this.id = this.route.snapshot.paramMap.get('id');
      console.log('ID:', this.id);
      //Grab the chat here
      this.store.dispatch(new GetMessages({cid:this.id}));
      this.messages$.subscribe((messages) => {
        if(messages != null){
          //this.chats = messages;
          //this.noChats = this.chats.length === 0;
        }
      });
      const now: Date = new Date();
      //console.log(tyepOf(now.getTime()));

      //this.openChatTime = Time();
      this.me='2';
      this.Chat = {
        id: '1',
        messages: [
          { from: '2', content: 'Hello', time: '12:30' },
          { from: '3', content: 'Hi', time: '12:31' },
          { from: '2', content: 'How are you?', time: '12:32' },
          { from: '3', content: 'I am good, thanks!', time: '12:33' },
          { from: '2', content: 'What are you up to?', time: '12:34' },
          { from: '3', content: 'Just working on some stuff.', time: '12:35' },
          { from: '2', content: 'Sounds busy!', time: '12:36' },
          { from: '3', content: 'Yeah, it is!', time: '12:37' },
          { from: '2', content: 'Well, good luck with that.', time: '12:38' },
          { from: '3', content: 'Thanks!', time: '12:39' },
          { from: '2', content: 'Talk to you later.', time: '12:40' },
          { from: '3', content: 'Bye!', time: '12:41' },
          { from: '2', content: 'See ya!', time: '12:42' },
          { from: '3', content: 'Take care!', time: '12:43' },
          { from: '2', content: 'You too!', time: '12:44' },
          { from: '3', content: 'Thanks!', time: '12:45' },
          { from: '2', content: 'No problem.', time: '12:46' },
          { from: '3', content: 'Bye!', time: '12:47' },
          { from: '2', content: 'Later!', time: '12:48' },
          { from: '3', content: 'My name is Walter Hartwell White. I live at 308 Negra Arroyo Lane Albuquerque New Mexico 87104. This is my confession.', time: '12:49' },
          { from: '3', content: 'Thats great to hear!', time: '12:50' }
        ],
        participants: '2,3',
        timeLeft: 7770
    }

    this.startTimer();
  }
    isMe(id: string){return id===this.me;}
    showid(){
      alert(this.id);
    }

    secondsToTime(seconds: number) {
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

   /* startTimer(){
      setInterval(() => {
        this.Chat.timeLeft--;
        }, 1000);
      }
    }*/

    startTimer(){
      setInterval(() => {
        this.Chat.timeLeft--;
        }, 1000);
    }

    addTime(minutes:number){
      //Add to database
      this.store.dispatch(new AddTime({time: minutes*60,cid:this.id}));
      this.Chat.timeLeft+=minutes*60;
    }
    
    Report(){
      //Add functionality to report 
    }

    Block(){
      //Add functiinality to Block
    }

    send(){
      //Add functionality to send message with service
      this.store.dispatch(new SendMessage({cid:this.id,message: this.outgoingMessage}));
      if(this.outgoingMessage != ''){
        const now = new Date();
        const hour = now.getHours().toString().padStart(2, '0');
        const minute = now.getMinutes().toString().padStart(2, '0');
        const time = `${hour}:${minute}`;

        this.Chat.messages.push({from: this.me, content: this.outgoingMessage, time: time});
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