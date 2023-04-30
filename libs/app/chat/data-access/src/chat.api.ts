import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { 
    ICreateChatRequest, 
    ICreateChatResponse,
    IGetChatRequest,
    IGetChatResponse,
    ISendMessageRequest,
    ISendMessageResponse,
    IAddTimeRequest,
    IAddTimeResponse,
    ISubtractTimeRequest,
    ISubtractTimeResponse
  } from '@mp/api/chat/util';

  import {
    IGetUserProfileRequest,
    IGetUserProfileResponse
  } from '@mp/api/users/util';

@Injectable()
export class ChatApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

    async sendMessage(request: ISendMessageRequest){
        console.log("ChatApi.sendMessage:");
        console.log(request);
        return await httpsCallable<
            ISendMessageRequest,
            ISendMessageResponse
        >(
            this.functions,
            'sendMessage'
        )(request)
    }

    async getUserProfile(request: IGetUserProfileRequest){
        return await httpsCallable<
            IGetUserProfileRequest,
            IGetUserProfileResponse
        >(
            this.functions,
            'getUserProfile'
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

    async addTime(request: IAddTimeRequest){
        return await httpsCallable<
            IAddTimeRequest,
            IAddTimeResponse
        >(
            this.functions,
            'addTime'
        )(request)
    }

    async subtractTime(request: ISubtractTimeRequest){
        return await httpsCallable<
            ISubtractTimeRequest,
            ISubtractTimeResponse
        >(
            this.functions,
            'subtractTime'
        )(request)
    }

      

}
