import { Timestamp } from 'firebase-admin/firestore';

export interface IProfile {
  age: number | null | undefined;
  bio: string | null | undefined;
  dob: Timestamp | null | undefined;
  gender: string | null | undefined;
  interests: string[] | null | undefined;
  name: string | null | undefined;
  phoneNumber: string | null | undefined;
  posts : string[] | null | undefined;
  profilePicture: string | null | undefined;
  sexuality : string | null | undefined;
  time : number | null | undefined;
}
