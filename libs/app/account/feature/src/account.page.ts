import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonPopover } from '@ionic/angular';
import { UpdateAccount, DeleteAccount } from '@mp/app/settings/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
//import { IProfile } from '@mp/api/profiles/util';
import { IPost, IUserProfile } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
// Fucking Ash Cache-em, gotta import 'em all
import { Timestamp as Timestamp3 } from '@firebase/firestore-types';
import { Timestamp as Timestamp1 } from '@firebase/firestore';
import { Timestamp as Timestamp2 } from '@angular/fire/firestore';
import { Timestamp } from '@firebase/firestore';
import { IInterests } from '@mp/api/interests/util';
@Component({
  selector: 'mp-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss']
})
export class AccountPage 
{
  uid!: string;
  ourProfile!: IUserProfile;

  profilePicture!: string;
  age!: number;
  bio!: string;

  interests!: IInterests[];
  time!: number;
  posts!: IPost[];
  // Sometimes my genius is frightening
  // dateOfBirth: Timestamp1 | Timestamp2 | Timestamp3 | Timestamp4;
  dateOfBirth!: Timestamp;

  valid = true;


  name!: string;
  email!: string;
  phone!: string;
  gender!: string;
  dob!: string;
  sexuality!: string;

  num! : number;
  test!:number
  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;
  constructor(public r : Router, public alertController:AlertController, private store: Store){
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if(profile != null)
      {
        console.log("User Logged in: " + profile.userId);
        this.ourProfile = profile;
        this.uid = profile.userId;
        if(profile.dob){
          this.test = profile.dob?.seconds;
          console.log("Profile date of birth");
          console.log(profile.dob);
        }
        const numberStringThatIWantToLogBecauseAllOfThiFsIsSoFuckingObtuseAndEsotericIHateIt:string = 
        JSON.stringify(profile.dob).substr((JSON.stringify(profile.dob).indexOf(':') + 1), 9);
        console.log(numberStringThatIWantToLogBecauseAllOfThiFsIsSoFuckingObtuseAndEsotericIHateIt)
        this.num = +(numberStringThatIWantToLogBecauseAllOfThiFsIsSoFuckingObtuseAndEsotericIHateIt);
          // 924134400
        this.assignDOB(profile.dob);
        
        // this.dob = profile.dob?.toDate();
        const date = new Date(this.num * 1000); // convert seconds to milliseconds
        const dateString = date.toISOString().substring(0, 10); // get yyyy-mm-dd from ISO string
        console.log("Date: " + dateString);
        // const d = dateString.replace(/\//g, "-")
        this.dob = dateString + "T00:00:00";
        console.log("GGGGGGGGGGGGGGGGGGGGGGG I want to die", this.dob);
        //console.log("Entered birth: ", this.dob.toLocaleDateString());
      }
        
    });
    //Fetch these from state

    if(this.ourProfile)
    {
      if (this.ourProfile.name)
        this.name = this.ourProfile.name;
      else
        this.valid = false;

      if (this.ourProfile.email)
        this.email = this.ourProfile.email;
      else
        this.valid = false;
      
      if (this.ourProfile.phoneNumber)
        this.phone = this.ourProfile.phoneNumber;
      else
        this.valid = false;

      if (this.ourProfile.gender)
        this.gender = this.ourProfile.gender;
      else
        this.valid = false;

      if (this.ourProfile.sexuality)
        this.sexuality = this.ourProfile.sexuality;
      else
        this.valid = false;

      if(this.ourProfile.profilePicture)
        this.profilePicture = this.ourProfile.profilePicture;
      else
        this.valid = false;

      if(this.ourProfile.age)
        this.age = this.ourProfile.age;
      else
        this.valid = false;

      if(this.ourProfile.bio)
        this.bio = this.ourProfile.bio;
      else
        this.valid = false;
      
     
        // inb4 copilot dum

      if(this.ourProfile.interests)
        this.interests = this.ourProfile.interests;
      else
        this.valid = false;

      if(this.ourProfile.time)
        this.time = this.ourProfile.time;
      else
        this.valid = false;

      if(this.ourProfile.posts)
        this.posts = this.ourProfile.posts;
      else
        this.valid = false;
    }
    
    //this.phone = '1234567890';
    //this.gender = 'Other';
    //this.sexuality = 'heterosexual';
  }

  assignDOB(date: any){
    this.dob = date;
    
    console.log("DOB: " + this.dob.toString());
  }

  @ViewChild('popover', { static: false }) popover!: IonPopover;

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  LoadSettingsPage()
  {
    this.r.navigate(['/settings'])
  }

  deleteAccount(){
    this.store.dispatch(new DeleteAccount({uid:"1"}));
    console.log("Account Deleted");
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.deleteAccount();
          }
        }
      ],
    });
    await alert.present();
  }
  Update(){
    console.log("On Update" + this.dob);
    if(this.dob && this.email && this.name && this.phone && this.gender && this.sexuality){
      const dateString = this.dob.toString().split('T')[0];
      const dateObj = new Date(Date.parse(dateString));
      
      let t: any; 
      if (t == undefined)
        try {
          t = Timestamp1.fromDate(dateObj);
        }catch (e) {
          console.log("Guess it's not of type Timestamp");
        }
      if (t == undefined)
        try{
          t = Timestamp2.fromDate(dateObj);
        }catch (e) {
          console.log("Guess it's not of type Timestamp");
        }
      const query  = {
        uid: this.uid,
        email: this.email,
        name: this.name,
        profilePicture: this.profilePicture,
        phoneNumber: this.phone,
        customClaims: this.ourProfile.customClaims,
        age: this.age,
        bio: this.bio,
        dob: t,
        gender: this.gender,
        interests: this.interests,
        sexuality: this.sexuality,
        time: this.time,
        posts: this.posts
      };

      //this.store.dispatch(new UpdateAccount(query));
      this.valid = true;
    }
  }
}
