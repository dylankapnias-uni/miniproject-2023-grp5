import { Component } from '@angular/core';
import { Chat } from '../Chat.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'mp-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage {
  chats!: Chat[];
  noChats!: boolean;
  constructor(private router: Router) {
    //Fetch these chats later with a service which I(adrian) will develop
    this.chats = [
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
    //this.chats = [];
    this.noChats = this.chats.length === 0;
  }

  openChat(chatId: string){
    //Navigate to chat page once we've figured out a way to pass the chatId to the chat page
    this.router.navigate([`/chat/${chatId}`]);
    setTimeout(() => {
      window.location.reload();
    }, 100)
  }
}
