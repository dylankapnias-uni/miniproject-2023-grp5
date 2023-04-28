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
//import { Timestamp } from '@firebase/firestore-types';
// import { Timestamp } from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';
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

  dateOfBirth!: Timestamp;

  valid = true;


  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;
  constructor(public r : Router, public alertController:AlertController, private store: Store){
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if(profile != null)
      {
        console.log("User Logged in: " + profile.userId);
        this.ourProfile = profile;
        this.uid = profile.userId;
        if(profile.dob)
        this.dob = profile.dob?.toString();
      }
        
    });
    //Fetch these from state

    if(this.ourProfile)
    {
      if (this.ourProfile.name)
        this.name = this.ourProfile.name;

      if (this.ourProfile.email)
        this.email = this.ourProfile.email;
      
      if (this.ourProfile.phoneNumber)
        this.phone = this.ourProfile.phoneNumber;

      if (this.ourProfile.gender)
        this.gender = this.ourProfile.gender;

      if (this.ourProfile.sexuality)
        this.sexuality = this.ourProfile.sexuality;

      if(this.ourProfile.profilePicture)
        this.profilePicture = this.ourProfile.profilePicture;

      if(this.ourProfile.age)
        this.age = this.ourProfile.age;

      if(this.ourProfile.bio)
        this.bio = this.ourProfile.bio;
        
      if(this.ourProfile.dob)
        this.dob = this.ourProfile.dob.toDate().toISOString();
        // inb4 copilot dum

      if(this.ourProfile.interests)
        this.interests = this.ourProfile.interests;

      if(this.ourProfile.time)
        this.time = this.ourProfile.time;

      if(this.ourProfile.posts)
        this.posts = this.ourProfile.posts;
    }
    
    //this.phone = '1234567890';
    //this.gender = 'Other';
    //this.sexuality = 'heterosexual';
  }
  @ViewChild('popover', { static: false }) popover!: IonPopover;

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  name!: string;
  email!: string;
  phone!: string;
  gender!: string;
  dob!: string;
  sexuality!: string;

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
    if(this.dob && this.email && this.name && this.phone && this.gender && this.sexuality){
      const dateString = this.dob.split('T')[0];
      const dateObj = new Date(Date.parse(dateString));
      const t = Timestamp.fromDate(dateObj);
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

      this.store.dispatch(new UpdateAccount(query));
    }
  }
}
