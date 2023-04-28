import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { 
    ICreateChatRequest, 
    ICreateChatResponse,
    IGetChatRequest,
    IGetChatResponse,
    ISendMessageRequest,
    ISendMessageResponse
  } from '@mp/api/chat/util';

@Injectable()
export class ChatApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

    async sendMessage(request: ISendMessageRequest){
        return await httpsCallable<
            ISendMessageRequest,
            ISendMessageResponse
        >(
            this.functions,
            'sendMessage'
        )(request)
    }

    async createChat(request: ICreateChatRequest){
        return await httpsCallable<
            ICreateChatRequest,
            ICreateChatResponse
        >(
            this.functions,
            'createChat'
        )(request)
    }

    async getChat(request: IGetChatRequest){
        return await httpsCallable<
            IGetChatRequest,
            IGetChatResponse
        >(
            this.functions,
            'getChat'
        )(request)
    }

}
