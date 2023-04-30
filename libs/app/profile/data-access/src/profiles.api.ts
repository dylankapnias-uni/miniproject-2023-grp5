import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import {
    IUpdateAccountDetailsRequest,
    IUpdateAccountDetailsResponse,
    IUpdateAddressDetailsRequest,
    IUpdateAddressDetailsResponse,
    IUpdateContactDetailsRequest,
    IUpdateContactDetailsResponse,
    IUpdateOccupationDetailsRequest,
    IUpdateOccupationDetailsResponse,
    IUpdatePersonalDetailsRequest,
    IUpdatePersonalDetailsResponse
} from '@mp/api/profiles/util';

import { IUserProfile } from '@mp/api/users/util';
@Injectable()
export class ProfilesApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  profile$(id: string) {
    const docRef = doc(
      this.firestore,
      `User_Profile/${id}`
    ).withConverter<IUserProfile>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IUserProfile;
      },
      toFirestore: (it: IUserProfile) => it,
    });
    return docData(docRef, { idField: 'userId' });
  }

  user$(id: string) {
    const docRef = doc(
      this.firestore,
      `User_Profile/${id}`
    ).withConverter<IUserProfile>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IUserProfile;
      },
      toFirestore: (it: IUserProfile) => it,
    });
    return docData(docRef, { idField: 'userId' });
  }

  async updateAccountDetails(request: IUpdateAccountDetailsRequest) {
    return await httpsCallable<
      IUpdateAccountDetailsRequest,
      IUpdateAccountDetailsResponse
    >(
      this.functions,
      'updateAccountDetails'
    )(request);
  }

  async updateContactDetails(request: IUpdateContactDetailsRequest) {
    return await httpsCallable<
      IUpdateContactDetailsRequest,
      IUpdateContactDetailsResponse
    >(
      this.functions,
      'updateContactDetails'
    )(request);
  }

  async updateAddressDetails(request: IUpdateAddressDetailsRequest) {
    return await httpsCallable<
      IUpdateAddressDetailsRequest,
      IUpdateAddressDetailsResponse
    >(
      this.functions,
      'updateAddressDetails'
    )(request);
  }

  async updatePersonalDetails(request: IUpdatePersonalDetailsRequest) {
    return await httpsCallable<
      IUpdatePersonalDetailsRequest,
      IUpdatePersonalDetailsResponse
    >(
      this.functions,
      'updatePersonalDetails'
    )(request);
  }

  async updateOccupationDetails(request: IUpdateOccupationDetailsRequest) {
    return await httpsCallable<
      IUpdateOccupationDetailsRequest,
      IUpdateOccupationDetailsResponse
    >(
      this.functions,
      'updateOccupationDetails'
    )(request);
  }
}
