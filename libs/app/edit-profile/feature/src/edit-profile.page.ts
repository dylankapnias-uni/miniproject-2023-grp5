import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { DeleteAccount, EditProfile } from '@mp/app/settings/util';
import { Observable } from 'rxjs';
import { IUserProfile } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { Timestamp } from '@firebase/firestore-types';
import { IInterests } from '@mp/api/interests/util';
import { IPost } from '@mp/api/users/util';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { update } from '@angular/fire/database';
// ALL PRAISE THE TIMESTAMP \[T]/
import { Timestamp as Timestamp1 } from '@firebase/firestore';
import { Timestamp as Timestamp2electricboogaloo } from '@angular/fire/firestore';
import { Timestamp as Timestamp3 } from 'firebase-admin/firestore';
// import { finalize } from 'rxjs/operators';
// import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { Timestamp } from '@angular/firestore';
//import { IProfile } from '@mp/api/profiles/util';

@Component({
  selector: 'mp-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss']
})
export class EditProfilePage 
{
  Bio!: string;
  /* I Love Comments♥ :smile: */
  /*// Very poignant commentary*/
  /* // // // // uid!:string; */
  /* // // // // email!: string; */
  /* // // // // name!: string; */
  /* // // // // profilePicture!: string; */
  /* // // // // phoneNumber!: string; */
  /* // // // // customClaims!: { [key: string]: any }; */
  /* // // // // created!: Timestamp; */
  /* // // // // age!: number; */
  /* // // // // bio!: string; */
  /* // // // // dob!: Timestamp; */
  /* // // // // gender!: string; */
  /* // // // // interests!: IInterests[]; */   
  /* // // // // sexuality!: string; */
  /* // // // // // time!: number; */
  /****** // // // // posts!: IPost[];******/
  /*
  * @param IWANTTODIE
  * @return fuckthisshit
  */

  StateBio!: string | null | undefined;
  changed = false;
  uploadImg = false;
  imagePreview!: SafeResourceUrl;
  //imagePreview!: File;
  fileToUpload!: File | null;
  url! : string;
  profile!: IUserProfile | null;
  
  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;
  constructor(public r : Router, private sanitizer: DomSanitizer, private store: Store /*private db: AngularFireDatabase, private storage: AngularFireStorage*/){
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if (profile) {
        this.profile = profile;
        if(this.profile.bio) {
          this.StateBio = profile.bio;
          this.Bio = this.profile.bio;
        }
        // this.uid = profile.userId;

        // if(profile.email)
        // this.email = profile.email;

        // if (profile.name)
        // this.name = profile.name;
        
        // if (profile.profilePicture)
        // this.profilePicture = profile.profilePicture;

        // if (profile.phoneNumber)
        // this.phoneNumber = profile.phoneNumber;

        // if (profile.customClaims)
        // this.customClaims = profile.customClaims;

        // if (profile.created)
        // this.created = profile.created;

        // if (profile.age)
        // this.age = profile.age;

        // if(profile.bio)
        // this.bio = profile.bio;

        // if (profile.dob)
        // this.dob = profile.dob;

        // if (profile.gender)
        // this.gender = profile.gender;
        
        // if (profile.interests)
        // this.interests = profile.interests;
 
        // if (profile.sexuality)
        // this.sexuality = profile.sexuality;

        // if (profile.time)
        // this.time = profile.time;
        
        // if (profile.posts)
        // this.posts = profile.posts;

      }   
    });

  }

  LoadSettingsPage() {
    this.r.navigate(['/settings'])
  }

  LoadInterests() {
    this.r.navigate(['/interests'])
  }

  validateBio() {
    if(this.profile)
      this.changed = (this.profile.bio != this.StateBio);
  }

  onFileSelected(event: any | unknown | null | undefined | Timestamp | void | Timestamp1 | Timestamp2electricboogaloo | Timestamp3/* Bruh again? */) {
    this.changed= true;
    this.uploadImg = true;
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result !== null) {
          this.imagePreview = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result.toString());
          //this.imagePreview = file;
          this.fileToUpload = event.target.files[0];
        }
      };
    }
  }

  async UpdateProfile() {

    if(this.fileToUpload) {
      console.log(this.Bio);
      if(this.profile)
      try {
        const url = await this.onUpload(this.fileToUpload);
        console.log(`This is the url: ${url}`);

        if(url != "fucked") {
          if(this.profile) {
            this.profile.profilePicture = url;
            this.profile.bio = this.Bio;
          }
        }
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
  
    if(this.profile)
    {
      console.log(this.profile.profilePicture);
      console.log(this.profile.bio)
      this.store.dispatch(new EditProfile(this.profile));
    }
  }

  async onUpload(file: File) : Promise<string> {
    // Add your code to post the image here
    console.log("In onUpload")
    if(!this.profile){
      throw new Error ("Log in pls");
    };
    const filePath = `/${this.profile.userId}/${file.name}`;
    const storage = getStorage();
    const fileRef = ref(storage, filePath);
    // const task = this.storage.uploadByt(filePath, file);
    const task = uploadBytesResumable(fileRef, file);

    //What is the import for this fucking shit
    task.on('state_changed' ,(snapshot) => {
        console.log(snapshot);
      }, (error) => {
        console.log(error);
      }, () => {
        getDownloadURL(task.snapshot.ref).then(async downloadURL => {
          console.log(downloadURL);
          return downloadURL;
        })
      }
    ) 
    return "fucked";
  }
}