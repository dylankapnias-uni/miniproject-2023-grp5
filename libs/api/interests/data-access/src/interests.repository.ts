import { IInterests } from '@mp/api/interests/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class InterestsRepository {
    async getSubInterests(interest: string) {
        return await admin
          .firestore()
          .collection('Interests')
          .withConverter<IInterests>({
            fromFirestore: (snapshot) => {
              return snapshot.data() as IInterests;
            },
            toFirestore: (it: IInterests) => it,
          })
          .doc(interest)
          .get();
      }

      async getInterests() {
        const snapshot = await admin.firestore().collection('Interests').get()
        return snapshot.docs.map(doc => doc.data());
      }
}