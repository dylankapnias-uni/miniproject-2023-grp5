import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { IUserProfile } from '@mp/api/users/util';
import { Select, Store } from '@ngxs/store';
import { ProfileState } from '@mp/app/profile/data-access';
import { Observable } from 'rxjs';
import { UploadPost } from '@mp/app/profile/util';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() ok = new EventEmitter<void>();

  image!: File;
  imagePreview!: SafeResourceUrl;
  fileToUpload!: File|null;
  profile!: IUserProfile | null;
  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;

  constructor(private sanitizer: DomSanitizer, public store: Store) {
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if (profile)
        this.profile = profile;
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
    if (this.image) {
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = () => {
        if (reader.result !== null) {
          this.imagePreview = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result.toString());
          this.fileToUpload = event.target.files[0];
        }
      };
    }
  }

  // onFileSelected(event: any) {
  //   this.changed= true;
  //   this.uploadImg = true;
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       if (reader.result !== null) {
  //         this.imagePreview = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result.toString());
  //         //this.imagePreview = file;
  //         this.fileToUpload = event.target.files[0];
  //       }
  //     };
  //   }
  // }
  async UpdateProfile(){
    if(this.image){
      try{
        const url = await this.onUpload();
        console.log(`This is the url: ${url}`);

        if(url != "fucked")
        {
          if(this.profile)
            this.profile.profilePicture = url;
        }
          
       
        //this.UpdateBio();
      }catch (error){
        console.error("Error uploading image", error);
      }
    }
  }

  async onUpload() : Promise<string> {
    // Add your code to post the image here
    console.log("In onUpload")
    if(!this.profile){
      throw new Error ("Log in pls");
    };
    // const filePath = ;
    const storage = getStorage();
    const fileRef = ref(storage, `/${this.profile.userId}/${this.image.name}`);
    // const task = this.storage.uploadByt(filePath, file);
    const task = uploadBytesResumable(fileRef, this.image);

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
