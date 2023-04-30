import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { 
  IAddChatRequest,
  IAddChatResponse, 
  ICreateChatListRequest, 
  ICreateChatListResponse, 
  IFetchChatListRequest, 
  IFetchChatListResponse,
  
} from '@mp/api/chat-list/util';
import { ChatListService } from '@mp/api/chat-list/feature';

export const addChat = functions.https.onCall(
  async (
    request: IAddChatRequest
  ): Promise<IAddChatResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(ChatListService);
    return service.addChat(request);
  }
);

export const createChatList = functions.https.onCall(
    async (
      request: ICreateChatListRequest
    ): Promise<ICreateChatListResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(ChatListService);
      return service.createChatList(request);
    }
);

export const fetchChatList = functions.https.onCall(
    async (
      request: IFetchChatListRequest
    ): Promise<IFetchChatListResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(ChatListService);
      return service.fetchChatList(request);
    }
  );

  