import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { chat } from '../chat.interface';

@Component({
  selector: 'mp-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  Chat!: chat;
  id!: number;
  me!: string;
  outgoingMessage = '';
  color = 'bronze';

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    ) {
      //Get id from route 
      /*this.route.paramMap.subscribe(paramMap => {
        this.id = parseInt(paramMap.get('id')!);
      })*/
      //Grab the chat here
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
          { from: '2', content: 'Thats great to hear!', time: '12:50' }
        ],
        participants: '2,3',
        timeLeft: 7770
    }
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

    addTime(minutes:number){
      //Add to database
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
      if(this.outgoingMessage != ''){
        const now = new Date();
        const hour = now.getHours().toString().padStart(2, '0');
        const minute = now.getMinutes().toString().padStart(2, '0');
        const time = `${hour}:${minute}`;

        this.Chat.messages.push({from: this.me, content: this.outgoingMessage, time: time});
        this.outgoingMessage = '';
      }
    }

    return(){
      console.log('go back');
      //this.router.navigate(['/messages']);
    }

}