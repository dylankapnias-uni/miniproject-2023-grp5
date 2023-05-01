import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { IUserProfile } from '@mp/api/users/util';
import{
  IGetUserProfileRequest,
  IGetUserProfileResponse
} from '@mp/api/users/util';

@Injectable()
export class UserApi {
    constructor(
        private readonly firestore: Firestore,
        private readonly functions: Functions
    ) {}

    async getUser(request: IGetUserProfileRequest){
        return await httpsCallable<
            IGetUserProfileRequest,
            IGetUserProfileResponse
        >(
            this.functions,
            'getUserProfile'
        )(request);
    }
}