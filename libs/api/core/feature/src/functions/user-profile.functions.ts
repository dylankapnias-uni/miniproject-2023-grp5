
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { UserProfileService } from '@mp/api/users/feature';
import { 
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

export const addShit = functions.https.onCall(
  async (
    req: any
    ): Promise<IUserProfile[]> => {
      const profilesNShit = [
        {
          userId: "5678",
          email: "janedoe@example.com",
          name: "Jane Doe",
          profilePicture: "https://example.com/janedoe.jpg",
          phoneNumber: "+1 555-555-5555",
          customClaims: { isAdmin: false },
          created: new Date(),
          age: 25,
          bio: "Lorem ipsum dolor sit amet",
          dob: new Date(),
          gender: "female",
          interests: [{ name: "reading", category: "education" }, { name: "traveling", category: "adventure" }],
          sexuality: "heterosexual",
          time: 1234567890,
          posts: [{ title: "My first post", content: "Lorem ipsum dolor sit amet", timestamp: new Date() }]
        },
        {
          userId: "9012",
          email: "bob@example.com",
          name: "Bob Smith",
          phoneNumber: "+1 555-555-5555",
          created: new Date(),
          age: 40,
          bio: "Lorem ipsum dolor sit amet",
          gender: "male",
          interests: [{ name: "sports", category: "fitness" }, { name: "cooking", category: "food" }],
          sexuality: "homosexual",
          time: 1234567890,
          posts: [{ title: "My first post", content: "Lorem ipsum dolor sit amet", timestamp: new Date() }]
        },
        {
          userId: "3456",
          name: "Amy Johnson",
          created: new Date(),
          age: 35,
          bio: "Lorem ipsum dolor sit amet",
          dob: new Date(),
          gender: "female",
          interests: [{ name: "yoga", category: "fitness" }, { name: "photography", category: "art" }],
          sexuality: "bisexual",
          time: 1234567890,
          posts: [{ title: "My first post", content: "Lorem ipsum dolor sit amet", timestamp: new Date() }]
        },
        {
          userId: "1357",
          email: "alice@example.com",
          name: "Alice Smith",
          created: new Date(),
          age: 45,
          bio: "Lorem ipsum dolor sit amet",
          dob: new Date(),
          gender: "female",
          interests: [{ name: "hiking", category: "adventure" }, { name: "painting", category: "art" }],
          sexuality: "heterosexual",
          time: 1234567890,
          posts: [{ title: "My first post", content: "Lorem ipsum dolor sit amet", timestamp: new Date() }]
        },
        {
          userId: "2468",
          email: "johndoe2@example.com",
          name: "John Doe Jr.",
          profilePicture: "https://example.com/johndoejr.jpg",
          phoneNumber: "+1 555-555-5555",
          created: new Date(),
          age: 18,
          bio: "Lorem ipsum dolor sit amet",
          gender: "male",
          interests: [{ name: "basketball", category: "sports" }, { name: "movies", category: "entertainment" }],
          sexuality: "heterosexual",
          time: 1234567890,
          posts: [{ title: "My first post", content: "Lorem ipsum dolor sit amet", timestamp: new Date() }]
        },
        {
          userId: "3690",
          email: "jane2@example.com",
          name: "Jane Doe Jr.",
          phoneNumber: "+1 555-555-5555",
          created: new Date(),
          age: 20,
          bio: "Lorem ipsum dolor sit amet",
          dob: new Date(),
          gender: "female",
          interests: [{ name: "dancing", category: "art" }, { name: "cooking", category: "food" }],
          sexuality: "heterosexual",
          time: 1234567890,
          posts: [{ title: "My first post", content: "Lorem ipsum dolor sit amet", timestamp: new Date() }]
        },
        {
          userId: "4826",
          email: "test@example.com",
          name: "Test User",
          profilePicture: "https://example.com/testuser.jpg",
          phoneNumber: "+1 555-555-5555",
          customClaims: { isAdmin: false },
          created: new Date(),
          age: 30,
          bio: "Lorem ipsum dolor sit amet",
          gender: "male",
          interests: [{ name: "coding", category: "technology" }, { name: "music", category: "entertainment" }],
          sexuality: "heterosexual",
          time: 1234567890,
          posts: [{ title: "My first post", content: "Lorem ipsum dolor sit amet", timestamp: new Date() }]
        },
        {
          userId: "7531",
          email: "jane@example.com",
          name: "Jane Smith",
          phoneNumber: "+1 555-555-5555",
          created: new Date(),
          age: 32,
          bio: "Lorem ipsum dolor sit amet",
          gender: "female",
          interests: [{ name: "yoga", category: "health" }, { name: "reading", category: "entertainment" }],
          sexuality: "heterosexual",
          time: 1234567890,
          posts: [{ title: "My first post", content: "Lorem ipsum dolor sit amet", timestamp: new Date() }]
        },
        {
          userId: "9514",
          email: "test2@example.com",
          name: "Test User2",
          phoneNumber: "+1 555-555-5555",
          customClaims: { isAdmin: true },
          created: new Date(),
          age: 25,
          bio: "Lorem ipsum dolor sit amet",
          gender: "male",
          interests: [{ name: "video games", category: "entertainment" }, { name: "cooking", category: "food" }],
          sexuality: "heterosexual",
          time: 1234567890,
          posts: [{ title: "My first post", content: "Lorem ipsum dolor sit amet", timestamp: new Date() }]
        },
        {
          userId: "7531",
          email: "jane2@example.com",
          name: "Jane Smith Jr.",
          profilePicture: "https://example.com/janesmithjr.jpg",
          phoneNumber: "+1 555-555-5555",
          created: new Date(),
          age: 15,
          bio: "Lorem ipsum dolor sit amet",
          gender: "female",
          interests: [{ name: "soccer", category: "sports" }, { name: "music", category: "entertainment" }],
          sexuality: "heterosexual",
          time: 1234567890,
          posts: [{ title: "My first post", content: "Lorem ipsum dolor sit amet", timestamp: new Date() }]
        },
        {
          userId: "9630",
          email: "bob@example.com",
          name: "Bob Johnson",
          phoneNumber: "+1 555-555-5555",
          created: new Date(),
          age: 28,
          bio: "Lorem ipsum dolor sit amet",
          gender: "male",
          interests: [{ name: "baseball", category: "sports" }, { name: "movies", category: "entertainment" }],
          sexuality: "heterosexual",
          time: 1234567890,
          posts: [{ title: "My first post", content: "Lorem ipsum dolor sit amet", timestamp: new Date() }]
        }
      ];
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(UserProfileService);
      profilesNShit.forEach(async (profile: IUserProfile) => {
        await service.createUserProfile(null);
      });
    // return service.createUserProfile(data);
  });
export const getUserProfile = functions.https.onCall(
  async (
    request: IGetUserProfileRequest
  ): Promise<IGetUserProfileResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(UserProfileService);
    return service.getUserProfile(request);
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