import { DocumentReference } from '@firebase/firestore-types'
import * as admin from 'firebase-admin';
export interface IUserRef {
    userRef: admin.firestore.DocumentReference<admin.firestore.DocumentData>;
}