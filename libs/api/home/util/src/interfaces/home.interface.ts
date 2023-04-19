import {IMatched} from './match.interface'
import { DocumentReference } from '@firebase/firestore-types'
import { IUserRef } from './userRef.interface';
export interface IHome{
    userList: {user:IUserRef,match:IMatched}[] | null | undefined;
}