import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import {
  DeleteAccount,
  EditProfile,
}
from '@mp/app/settings/util';
import { Observable } from 'rxjs';
//import { IProfile } from '@mp/api/profiles/util';
import { IUserProfile } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { Timestamp } from '@firebase/firestore-types';
import { IInterests } from '@mp/api/interests/util';
import { IPost } from '@mp/api/users/util';

@Component({
  selector: 'mp-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss']
})
export class EditProfilePage 
{
  Bio!: string;
  uid!:string;
  email!: string;
  name!: string;
  profilePicture!: string;
  phoneNumber!: string;
  customClaims!: { [key: string]: any };
  created!: Timestamp;
  age!: number;
  bio!: string;
  dob!: Timestamp;
  gender!: string;
  interests!: IInterests[];
  sexuality!: string;
  time!: number;
  posts!: IPost[];

  StateBio!: string;
  changed = false;
  uploadImg = false;
  imagePreview!: SafeResourceUrl;
  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;

  constructor(public r : Router, private sanitizer: DomSanitizer, private store: Store){
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if (profile)
      {
        this.uid = profile.userId;

        if(profile.email)
        this.email = profile.email;

        if (profile.name)
        this.name = profile.name;
        
        if (profile.profilePicture)
        this.profilePicture = profile.profilePicture;

        if (profile.phoneNumber)
        this.phoneNumber = profile.phoneNumber;

        if (profile.customClaims)
        this.customClaims = profile.customClaims;

        if (profile.created)
        this.created = profile.created;

        if (profile.age)
        this.age = profile.age;

        if(profile.bio)
        this.bio = profile.bio;

        if (profile.dob)
        this.dob = profile.dob;

        if (profile.gender)
        this.gender = profile.gender;
        
        if (profile.interests)
        this.interests = profile.interests;
 
        if (profile.sexuality)
        this.sexuality = profile.sexuality;

        if (profile.time)
        this.time = profile.time;
        
        if (profile.posts)
        this.posts = profile.posts;

  
      }   
    });
    this.StateBio = this.bio;
    this.Bio = this.StateBio;
  }

  LoadSettingsPage()
  {
    this.r.navigate(['/settings'])
  }

  LoadInterests()
  {
    this.r.navigate(['/interests'])
  }

  UpdateBio(){
    console.log(this.Bio, " Push to state from here");
    
    const query  = {
      uid: this.uid,
      email: this.email,
      name: this.name,
      profilePicture: this.profilePicture,
      phoneNumber: this.phoneNumber,
      customClaims: this.customClaims,
      age: this.age,
      bio: this.Bio,
      dob: this.dob,
      gender: this.gender,
      interests: this.interests,
      sexuality: this.sexuality,
      time: this.time,
      posts: this.posts
    };
    
    this.store.dispatch(new EditProfile(query));
  }

  validateBio(){
    if(this.Bio != this.StateBio)
      this.changed = true;
    else
      this.changed = false;
  }

  onFileSelected(event: any) {
    this.changed= true;
    this.uploadImg = true;
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result !== null) {
          this.imagePreview = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result.toString());
        }
      };
    }
  }

  onUpload() {
    // Add your code to post the image here
  }
}
