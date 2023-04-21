import { IUserProfile, UserCreatedEvent } from '@mp/api/users/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';

export class User extends AggregateRoot implements IUserProfile {
  constructor(
    public userId: string,
    public email?: string | null | undefined,
    public name?: string | null | undefined,
    public profilePicture?: string | null | undefined,
    public phoneNumber?: string | null | undefined,
    public customClaims?: { [key: string]: any } | null | undefined,
    public created?: Timestamp | null | undefined
  ) {
    super();
  }

  static fromData(user: IUserProfile): User {
    const instance = new User(
      user.userId,
      user.email,
      user.name,
      user.profilePicture,
      user.phoneNumber,
      user.customClaims,
      user.created
    );
    return instance;
  }

  create() {
    this.apply(new UserCreatedEvent(this.toJSON()));
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
    };
  }
}
