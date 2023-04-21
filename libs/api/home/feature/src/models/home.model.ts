
import { HomeCreatedEvent, IHome, IMatched, IUserMatch, IUserRef, UserAcceptedEvent } from '@mp/api/home/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class Home extends AggregateRoot implements IHome {
  constructor(
    public userId: string,
    public userList: IUserMatch[] | null | undefined,
  ) {
    super();
  }

  static fromData(home: IHome): Home {
    const instance = new Home(
      home.userId,
      home.userList,
    );
    return instance;
  }

  create() {
    this.apply(new HomeCreatedEvent(this.toJSON()));
  }


  public acceptUser() {
    if(!this.userList){
      console.log("no userlist");
      return;
    }
    this.apply(new UserAcceptedEvent(this.toJSON()));
  }

  // updateStatus() {
  //   this.updateAccountDetailsStatus();
  //   this.updateAddressDetailsStatus();
  //   this.updateContactDetailsStatus();
  //   this.updatePersonalDetailsStatus();
  //   this.updateOccupationDetailsStatus();

  //   if (
  //     this.accountDetails?.status === ProfileStatus.COMPLETE &&
  //     this.addressDetails?.status === ProfileStatus.COMPLETE &&
  //     this.contactDetails?.status === ProfileStatus.COMPLETE &&
  //     this.personalDetails?.status === ProfileStatus.COMPLETE &&
  //     this.occupationDetails?.status === ProfileStatus.COMPLETE
  //   ) {
  //     this.status = ProfileStatus.COMPLETE;
  //   }

  //   this.apply(new ProfileStatusUpdatedEvent(this.toJSON()));
  // }

  toJSON(): IHome {
    return {
      userId: this.userId,
      userList: this.userList,
    };
  }
}
