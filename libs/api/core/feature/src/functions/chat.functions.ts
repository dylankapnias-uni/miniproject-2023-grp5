import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { 
  ICreateChatRequest, 
  ICreateChatResponse,
  IGetChatRequest,
  IGetChatResponse,
  ISendMessageRequest,
  ISendMessageResponse,
  ISubtractTimeRequest,
  ISubtractTimeResponse,
  IAddTimeRequest,
  IAddTimeResponse
} from '@mp/api/chat/util';
import { ChatService } from '@mp/api/chat/feature';

export const sendMessage = functions.https.onCall(
  async (
    request: ISendMessageRequest
  ): Promise<ISendMessageResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(ChatService);
    return service.sendMessage(request);
  }
);

export const createChat = functions.https.onCall(
    async (
      request: ICreateChatRequest
    ): Promise<ICreateChatResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(ChatService);
      return service.createChat(request);
    }
);

export const getChat = functions.https.onCall(
    async (
      request: IGetChatRequest
    ): Promise<IGetChatResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(ChatService);
      return service.getChat(request);
    }
  );

  export const addChatTime = functions.https.onCall(
    async (
      request: IAddTimeRequest
    ): Promise<IAddTimeResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(ChatService);
      return service.addTime(request);
    }
  );

  export const subtractChatTime = functions.https.onCall(
    async (
      request: ISubtractTimeRequest
    ): Promise<ISubtractTimeResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(ChatService);
      return service.subtractTime(request);
    }
  );