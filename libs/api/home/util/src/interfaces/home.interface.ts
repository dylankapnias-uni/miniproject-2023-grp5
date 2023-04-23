import { IProfile } from '@mp/api/profiles/util';
import {IMatched} from './match.interface'
import { IUserRef } from './userRef.interface';
import { IUserMatch } from './userMatch.interface';
export interface IHome{
    userId:string,
    // userList: {user:IUserRef,match:IMatched}[] | null | undefined;
    userList: IUserMatch[];
}