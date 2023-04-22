import { Timestamp } from 'firebase-admin/firestore';
import { IPost } from './post.interface';
import { IInterests } from '../enums';

export interface IUserProfile {
  userId: string; // renamed from id
  email?: string | null | undefined;
  name?: string | null | undefined; // renamed from displayName
  profilePicture?: string | null | undefined; // renamed from photoURL
  phoneNumber?: string | null | undefined;
  customClaims?: { [key: string]: any } | null | undefined;
  created?: Timestamp | null | undefined;
  // added
  age?: number | null | undefined;
  bio?: string | null | undefined;
  // TODO: Yeah idk chief I think a string would be better
  // than a representation of the number of nanoseconds since 
  // the Unix epoch. Converting from a string to a timestamp
  // and then back again when it needs to be displayed seems
  // like it'll be a chore
  dob?: Timestamp | null | undefined;
  gender?: string | null | undefined;
  interests?: IInterests[] | null | undefined;
  // TODO: figure out if this needs to be a string for inclusivity
  // or an enum for matchmaking
  sexuality?: string | null | undefined;
  time?: number | null | undefined;
  posts?: IPost[] | null | undefined;
}
