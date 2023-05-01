
import { UserHomeCreatedEvent, IHome, IMatched, IParsingData, IUserMatch, IUserRef, UserAcceptedEvent, UserRejectedEvent } from '@mp/api/home/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class Home extends AggregateRoot implements IParsingData {
  constructor(
    public userId: string,
    public userRef: IUserRef,
  ) {
    super();
  }

  static fromData(home: IParsingData): Home {
    const instance = new Home(
      home.userId,
      home.userRef
    );
    return instance;
  }

  create() {
    this.apply(new UserHomeCreatedEvent(this.toJSON()));
  }

  public acceptUser(newUser: IUserMatch) {
    // bullshit existence check to appease the fictional typescript gods
    if(!newUser.user?.userId) throw new Error('User is not, therefore user does not think');
    // add accepted user to current user's visited array
    this.userRef.visited.push(newUser.user?.userId);
    const index =  this.userRef.accepted.indexOf(newUser.user?.userId);
    // if other user has accepted current user
    if(newUser.match){
      // remove other user from current user's accepted array
      // such that they may no longer appear in future swipes
      if (index == -1) return;
        this.userRef.accepted.splice(index, 1);
    }
    this.apply(new UserAcceptedEvent(this.toJSON(), newUser));
    
  }

  public rejectUser(newUser: IUserMatch) {
    // bullshit existence check to appease the fictional typescript gods
    if(newUser.user?.userId == null ||  newUser.user?.userId == undefined) 
      throw new Error('User is not, therefore user does not think');
    // add rejected user to current user's visited array
    this.userRef.visited.push(newUser.user?.userId);
    const index =  this.userRef.accepted.indexOf(newUser.user?.userId);
    // if love is unrequited D:
    if(newUser.match){
      // remove other user from current user's accepted array
      // such that they may no longer appear in future swipes
      if (index == -1) return;
        this.userRef.accepted.splice(index, 1);
    }
    this.apply(new UserRejectedEvent(this.toJSON(), newUser));
  }

  toJSON(): IParsingData {
    return {
      userId: this.userId,
      userRef: this.userRef,
    };
  }
}
