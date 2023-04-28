
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { UserProfileService } from '@mp/api/users/feature';
import { 
  IGetUserProfileListRequest,
  IGetUserProfileListResponse,
  ICreateUserRequest,
  ICreateUserResponse,
  IDeleteUserProfileRequest,
  IDeleteUserProfileResponse,
  IGetUserProfileRequest,
  IGetUserProfileResponse,
  IUpdateUserProfileRequest, 
  IUpdateUserProfileResponse,
  IUserProfile
} from '@mp/api/users/util';
import { Timestamp } from 'firebase-admin/firestore';
export const addShit = functions.https.onCall(
  async (
    req: any
    ): Promise<IUserProfile[]> => {
      const profilesNShit: IUserProfile[] = [
        {
          userId: "5678",
          email: "janedoe@example.com",
          name: "Jane Doe",
          phoneNumber: "+1 555-555-5555",
          customClaims: { isAdmin: false },
          created: Timestamp.fromDate(new Date()),
          age: 25,
          bio: "Lorem ipsum dolor sit amet",
          dob: Timestamp.fromDate(new Date()),
          gender: "female",
          interests: [{ interest: "reading", category: "education" }, { interest: "traveling", category: "adventure" }],
          sexuality: "heterosexual",
          time: 1234567890,
        },
        {
          userId: "9012",
          email: "bob@example.com",
          name: "Bob Smith",
          phoneNumber: "+1 555-555-5555",
          created: Timestamp.fromDate(new Date()),
          age: 40,
          bio: "Lorem ipsum dolor sit amet",
          gender: "male",
          interests: [{ interest: "sports", category: "fitness" }, { interest: "cooking", category: "food" }],
          sexuality: "homosexual",
          time: 1234567890,
        },
        {
          userId: "3456",
          name: "Amy Johnson",
          created: Timestamp.fromDate(new Date()),
          age: 35,
          bio: "Lorem ipsum dolor sit amet",
          dob: Timestamp.fromDate(new Date()),
          gender: "female",
          interests: [{ interest: "yoga", category: "fitness" }, { interest: "photography", category: "art" }],
          sexuality: "bisexual",
          time: 1234567890,
        },
        {
          userId: "1357",
          email: "alice@example.com",
          name: "Alice Smith",
          created: Timestamp.fromDate(new Date()),
          age: 45,
          bio: "Lorem ipsum dolor sit amet",
          dob: Timestamp.fromDate(new Date()),
          gender: "female",
          interests: [{ interest: "hiking", category: "adventure" }, { interest: "painting", category: "art" }],
          sexuality: "heterosexual",
          time: 1234567890,
        },
        {
          userId: "2468",
          email: "johndoe2@example.com",
          name: "John Doe Jr.",
          phoneNumber: "+1 555-555-5555",
          created: Timestamp.fromDate(new Date()),
          age: 18,
          bio: "Lorem ipsum dolor sit amet",
          gender: "male",
          interests: [{ interest: "basketball", category: "sports" }, { interest: "movies", category: "entertainment" }],
          sexuality: "heterosexual",
          time: 1234567890,
        },
        {
          userId: "3690",
          email: "jane2@example.com",
          name: "Jane Doe Jr.",
          phoneNumber: "+1 555-555-5555",
          created: Timestamp.fromDate(new Date()),
          age: 20,
          bio: "Lorem ipsum dolor sit amet",
          dob: Timestamp.fromDate(new Date()),
          gender: "female",
          interests: [{ interest: "dancing", category: "art" }, { interest: "cooking", category: "food" }],
          sexuality: "heterosexual",
          time: 1234567890,
        },
        {
          userId: "4826",
          email: "test@example.com",
          name: "Test User",
          phoneNumber: "+1 555-555-5555",
          customClaims: { isAdmin: false },
          created: Timestamp.fromDate(new Date()),
          age: 30,
          bio: "Lorem ipsum dolor sit amet",
          gender: "male",
          interests: [{ interest: "coding", category: "technology" }, { interest: "music", category: "entertainment" }],
          sexuality: "heterosexual",
          time: 1234567890,
        },
        {
          userId: "7531",
          email: "jane@example.com",
          name: "Jane Smith",
          phoneNumber: "+1 555-555-5555",
          created: Timestamp.fromDate(new Date()),
          age: 32,
          bio: "Lorem ipsum dolor sit amet",
          gender: "female",
          interests: [{ interest: "yoga", category: "health" }, { interest: "reading", category: "entertainment" }],
          sexuality: "heterosexual",
          time: 1234567890,
        },
        {
          userId: "9514",
          email: "test2@example.com",
          name: "Test User2",
          phoneNumber: "+1 555-555-5555",
          customClaims: { isAdmin: true },
          created: Timestamp.fromDate(new Date()),
          age: 25,
          bio: "Lorem ipsum dolor sit amet",
          gender: "male",
          interests: [{ interest: "video games", category: "entertainment" }, { interest: "cooking", category: "food" }],
          sexuality: "heterosexual",
          time: 1234567890,
        },
        {
          userId: "7531",
          email: "jane2@example.com",
          name: "Jane Smith Jr.",
          phoneNumber: "+1 555-555-5555",
          created: Timestamp.fromDate(new Date()),
          age: 15,
          bio: "Lorem ipsum dolor sit amet",
          gender: "female",
          interests: [{ interest: "soccer", category: "sports" }, { interest: "music", category: "entertainment" }],
          sexuality: "heterosexual",
          time: 1234567890,
        },
        {
          userId: "9630",
          email: "bob@example.com",
          name: "Bob Johnson",
          phoneNumber: "+1 555-555-5555",
          created: Timestamp.fromDate(new Date()),
          age: 28,
          bio: "Lorem ipsum dolor sit amet",
          gender: "male",
          interests: [{ interest: "baseball", category: "sports" }, { interest: "movies", category: "entertainment" }],
          sexuality: "heterosexual",
          time: 1234567890,
        }
      ];
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(UserProfileService);
      profilesNShit.forEach(async (profile: IUserProfile) => {
        await service.createMockUser(profile);
      });
    return profilesNShit;
  });
export const getUserProfile = functions.https.onCall(
  async (
    request: IGetUserProfileRequest
  ): Promise<IGetUserProfileResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(UserProfileService);
    return service.getUserProfile(request);
  });

export const getUserProfileList = functions.https.onCall(
  async (
    request: IGetUserProfileListRequest
  ): Promise<IGetUserProfileListResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(UserProfileService);
    return service.getUserProfileList(request);
  });

export const updateUserProfile = functions.https.onCall(
  async (
    request: IUpdateUserProfileRequest
  ): Promise<IUpdateUserProfileResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(UserProfileService);
    return service.updateUserProfile(request);
  });

export const deleteUserProfile = functions.https.onCall(
  async (
    request: IDeleteUserProfileRequest
  ): Promise<IDeleteUserProfileResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(UserProfileService);
    return service.deleteUserProfile(request);
  });

export const createUserProfile = functions.https.onCall(
  async (
    request: ICreateUserRequest
  ): Promise<ICreateUserResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(UserProfileService);
    return service.createUserProfile(request);
  })