import { DocumentReference } from '@firebase/firestore-types'
import * as admin from 'firebase-admin';
import { DocumentData } from 'firebase-admin/firestore';
export interface IUserRef {
    // userRef: admin.firestore.DocumentReference<admin.firestore.DocumentData>[];
    swiped: DocumentReference[];
}