import { IInterests } from '@mp/api/users/util';
import { IPost, IUserProfile, UserCreatedEvent, UserProfileDeletedEvent, UserProfileUpdatedEvent } from '@mp/api/users/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';

export class UserProfile extends AggregateRoot implements IUserProfile {
  constructor(
    public userId: string,
    public email?: string | null | undefined,
    public name?: string | null | undefined,
    public profilePicture?: string | null | undefined,
    public phoneNumber?: string | null | undefined,
    public customClaims?: { [key: string]: any } | null | undefined,
    public created?: Timestamp | null | undefined,
    public age?: number | null | undefined,
    public bio?: string | null | undefined,
    public dob?: Timestamp | null | undefined,
    public gender?: string | null | undefined,
    public interests?: IInterests[] | null | undefined,
    public sexuality?: string | null | undefined,
    public time?: number | null | undefined,
    public posts?: IPost[] | null | undefined
  ) {
    super();
  }

  static fromData(user: IUserProfile): UserProfile {
    const instance = new UserProfile(
      user.userId,
      user.email,
      user.name,
      user.profilePicture,
      user.phoneNumber,
      user.customClaims,
      user.created,
      user.age,
      user.bio,
      user.dob,
      user.gender,
      user.interests,
      user.sexuality,
      user.time,
      user.posts
    );
    return instance;
  }
  
  create() {
    this.apply(new UserCreatedEvent(this.toJSON()));
  }

  update() {
    this.apply(new UserProfileUpdatedEvent({userProfile: this.toJSON()}));
  }

  delete() {
    this.apply(new UserProfileDeletedEvent({userId: this.userId}));
  }

  toJSON(): IUserProfile {
    return {
      userId: this.userId,
      email: this.email,
      name: this.name,
      profilePicture: this.profilePicture,
      phoneNumber: this.phoneNumber,
      customClaims: this.customClaims,
      created: this.created,
      age: this.age,
      bio: this.bio,
      dob: this.dob,
      gender: this.gender,
      interests: this.interests,
      sexuality: this.sexuality,
      time: this.time,
      posts: this.posts
    };
  }
}
