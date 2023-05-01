import { IPost, IUserProfile, UserCreatedEvent, UserProfileDeletedEvent, UserProfileUpdatedEvent } from '@mp/api/users/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { IInterests } from '@mp/api/interests/util';
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
    if(this.profilePicture == null || this.profilePicture == undefined || this.profilePicture.length < 1){
      this.profilePicture="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    }

    if(this.interests == null || this.interests == undefined || this.interests.length < 1)
    {
      this.interests =[
        {
          category: "No Interest",
          interest: "No Interest",
        },

        {
          category: "No Interest",
          interest: "No Interest",
        },

        {
          category: "No Interest",
          interest: "No Interest",
        },
      ]
    }
    this.apply(new UserCreatedEvent(this.toJSON()));
  }

  update() {

    const now: any = Timestamp.fromDate(new Date());
    let dob: any = this.dob;
    let millis: number;
    if(!dob) {
      dob = Timestamp.fromDate(new Date());
    }
    // guess the now object's format
    if (now._seconds != undefined) {
      millis = now._seconds*1000;
    }
    else if (now.seconds != undefined) {
      millis = now.seconds*1000;
    }
    else {
      console.log("yeah idk");
      throw new Error("seconds not here bro");
    }
    // guess the dob object's format
    if (dob._seconds != undefined) {
      millis -= dob._seconds*1000;
    }
    else if (dob.seconds != undefined) {
      millis -= dob.seconds*1000;
    }
    else {
      console.log("yeah idk");
      throw new Error("seconds not here bro");
    }
    console.log(typeof millis);
    if (isNaN(millis)) {
      throw new Error("How the fuck does number - number = NaN?");
    }
    console.log("How old is my baby? Oh he's only ", millis, " seconds old");
    try{
      this.age = Math.floor(millis/31557600);
      this.dob = dob;
    } catch (e5) {
      console.log("Timestamps are dumb");
      console.log({dob: dob, now: now, millis: millis});
      console.log(e5);
    }

    // try {
    //   const bruh :{s: number, n:number} = dob;
    //   const bruh2ElectricBoogaloo:[s: number, n:number] = now;
    //   // const s:seconds, n:nanos}: {s:number, n: number} = bruh2ElectricBoogaloo;

    //   let temp: number = Number.MAX_SAFE_INTEGER;
    //   try {
    //     bruh2ElectricBoogaloo.forEach((element: number) => {
    //       if ( temp < element) {
    //         temp = element;
    //       }
    //     });
    //   }catch(e2) {
    //     console.log("My last hope")
    //   }
    //   console.log("Seconds: ", temp);
      
    //   const bruhClone={s:dob.seconds,n:dob.nanoseconds};
    //   console.log("Sawubona: ", JSON.stringify(bruhClone));
      
    //   console.log({bruh:bruh, bruh2:bruh2ElectricBoogaloo, flag:"This one"});
    // }catch(ohFuckoff){
    //   console.log("We Try, i cri ;-;");
    // }
    console.log(this.toJSON());
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
