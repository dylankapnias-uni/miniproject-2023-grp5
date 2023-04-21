import { Timestamp } from 'firebase-admin/firestore';

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
  dob?: Timestamp | null | undefined;
  gender?: string | null | undefined;
  interests?: string[] | null | undefined;
  sexuality?: string | null | undefined;
  time?: number | null | undefined;
}
