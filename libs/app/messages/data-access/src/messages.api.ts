import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { 
    IAddChatRequest,
    IAddChatResponse, 
    ICreateChatListRequest, 
    ICreateChatListResponse, 
    IFetchChatListRequest, 
    IFetchChatListResponse
  } from '@mp/api/chat-list/util';

@Injectable()
export class MessagesApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

    async addChat(request: IAddChatRequest){
        return await httpsCallable<
            IAddChatRequest,
            IAddChatResponse
        >(
            this.functions,
            'addChat'
        )(request)
    }

    async createChatList(request: ICreateChatListRequest){
        return await httpsCallable<
            ICreateChatListRequest,
            ICreateChatListResponse
        >(
            this.functions,
            'createChatList'
        )(request)
    }

    async fetchChatList(request: IFetchChatListRequest){
        return await httpsCallable<
            IFetchChatListRequest,
            IFetchChatListResponse
        >(
            this.functions,
            'fetchChatList'
        )(request)
    }


}
