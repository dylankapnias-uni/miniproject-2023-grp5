import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';

import { 
    IAcceptUserRequest,
    IAcceptUserResponse,
    ICreateUserHomeRequest,
    ICreateUserHomeResponse,
    IRejectUserRequest,
    IRejectUserResponse,
    IRetrieveHomeUsersRequest, 
    IRetrieveHomeUsersResponse 
  } from '@mp/api/home/util';


@Injectable()
export class HomeApi {
    constructor(
        private readonly firestore: Firestore,
        private readonly functions: Functions
    ) {}

    async createUserHome(request: ICreateUserHomeRequest){
        return await httpsCallable<
            ICreateUserHomeRequest,
            ICreateUserHomeResponse
        >(
            this.functions,
            'createUserHome'
        )(request)
    }

    async acceptUser(request: IAcceptUserRequest){
        return await httpsCallable<
            IAcceptUserRequest,
            IAcceptUserResponse
        >(
            this.functions,
            'acceptUser'
        )(request)
    }

    async rejectUser(request: IRejectUserRequest){
        return await httpsCallable<
            IRejectUserRequest,
            IRejectUserResponse
        >(
            this.functions,
            'rejectUser'
        )(request)
    }

    async retrieveHomeUsers(request: IRetrieveHomeUsersRequest){
        return await httpsCallable<
            IRetrieveHomeUsersRequest,
            IRetrieveHomeUsersResponse
        >(
            this.functions,
            'retrieveHomeUsers'
        )(request)
    }
}
