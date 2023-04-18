import { DocumentReference } from '@firebase/firestore-types'
export interface IChatList {
    chatRef: DocumentReference;
    otherUserID: DocumentReference;
}