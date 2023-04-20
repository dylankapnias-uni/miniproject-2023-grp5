
import { HomeCreatedEvent, IHome, IMatched, IUserRef } from '@mp/api/home/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class Home extends AggregateRoot implements IHome {
  constructor(
    public userId: string,
    public userList: {user:IUserRef,match:IMatched}[] | null | undefined,
  ) {
    super();
  }

  static fromData(profile: IHome): Home {
    const instance = new Home(
      profile.userId,
      profile.userList,
    );
    return instance;
  }

  create() {
    this.apply(new HomeCreatedEvent(this.toJSON()));
  }


  private acceptUser() {
    if (!this.occupationDetails) {
      this.occupationDetails = {};
      this.occupationDetails.status = ProfileStatus.INCOMPLETE;
      this.status = ProfileStatus.INCOMPLETE;
      return;
    }

    if (
      !this.occupationDetails.householdIncome ||
      !this.occupationDetails.occupation
    ) {
      this.occupationDetails.status = ProfileStatus.INCOMPLETE;
      this.status = ProfileStatus.INCOMPLETE;
      return;
    }

    this.occupationDetails.status = ProfileStatus.COMPLETE;
    return;
  }

  updateStatus() {
    this.updateAccountDetailsStatus();
    this.updateAddressDetailsStatus();
    this.updateContactDetailsStatus();
    this.updatePersonalDetailsStatus();
    this.updateOccupationDetailsStatus();

    if (
      this.accountDetails?.status === ProfileStatus.COMPLETE &&
      this.addressDetails?.status === ProfileStatus.COMPLETE &&
      this.contactDetails?.status === ProfileStatus.COMPLETE &&
      this.personalDetails?.status === ProfileStatus.COMPLETE &&
      this.occupationDetails?.status === ProfileStatus.COMPLETE
    ) {
      this.status = ProfileStatus.COMPLETE;
    }

    this.apply(new ProfileStatusUpdatedEvent(this.toJSON()));
  }

  toJSON(): IProfile {
    return {
      userId: this.userId,
      accountDetails: this.accountDetails,
      personalDetails: this.personalDetails,
      contactDetails: this.contactDetails,
      addressDetails: this.addressDetails,
      occupationDetails: this.occupationDetails,
      status: this.status,
      created: this.created,
    };
  }
}
