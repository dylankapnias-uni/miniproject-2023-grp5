
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
    if(!newUser.user?.userId) throw new Error('User ID is null');

    if(newUser.match){
      //TODO: Create New Chat
    }
    else{
      this.userRef.accepted.push(newUser.user?.userId);
      this.apply(new UserAcceptedEvent(this.toJSON()));
    }
    
  }

  public rejectUser(newUserId: string) {

      this.userRef.visited.push(newUserId);
      this.apply(new UserRejectedEvent(this.toJSON()));
    
  }

  toJSON(): IParsingData {
    return {
      userId: this.userId,
      userRef: this.userRef,
    };
  }
}
