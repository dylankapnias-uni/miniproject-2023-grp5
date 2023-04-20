import { IChat } from '@mp/api/chat/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ChatRepository 
{
  //private databaseRef: admin.database.Reference;

  constructor() {
    //this.databaseRef = admin.database().ref('/chats');
  }

  async getChat(chatID: string): Promise<string> {
    console.log('ChatRepository.getChat()');
    const str = await Promise.resolve('Hello, world!');
    return str;
  }

  async updateChat(chatID: string): Promise<string> {
    console.log('ChatRepository.updateChat()', chatID);
    const str = await Promise.resolve('Hello, world!');
    return str;
  }

  async createChat(chatID: string, chat: IChat): Promise<string> {
    console.log('ChatRepository.createChat()', chatID, chat);
    const str = await Promise.resolve('Hello, world!');
    return str;
  }
}