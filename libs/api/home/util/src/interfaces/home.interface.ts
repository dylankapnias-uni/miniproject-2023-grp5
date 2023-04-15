import {IProfile} from '@mp/api/user-profile/util';
import { DocumentReference } from '@firebase/firestore-types'
export interface IHome{
    userList: DocumentReference[] | null | undefined;
}