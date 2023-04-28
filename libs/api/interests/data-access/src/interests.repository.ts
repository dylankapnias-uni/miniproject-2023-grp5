import { IInterestsDocument, IInterests } from '@mp/api/interests/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
@Injectable()
export class InterestsRepository {
  async getInterests() {
    return await admin
      .firestore()
      .collection('Interests')
      .withConverter<IInterestsDocument>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IInterestsDocument;
        },
        toFirestore: (it: IInterestsDocument) => it,
      })
      .doc('Interests')
      .get();
  }

  async addInterest( interest: IInterests) {
    return await admin
      .firestore()
      .collection('Interests')
      .doc('Interests')
      .update({
        'list': FieldValue.arrayUnion(interest)
      })
      .catch((err) => {
        console.log(err);
      });
  }
}