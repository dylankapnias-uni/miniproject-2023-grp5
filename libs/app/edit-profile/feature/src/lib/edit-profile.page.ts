import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Storage, getStorage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
//import { FieldPath } from 'firebase-admin/firestore';

@Component({
  selector: 'mp-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss']
})
export class EditProfilePage 
{
  Bio!: string;
  StateBio!: string;
  changed = false;
  uploadImg = false;
  imagePreview!: SafeResourceUrl;
  fileToUpload!: File|null;

  constructor(public r : Router, private sanitizer: DomSanitizer, 
    private storage: Storage
    ){
    this.StateBio = "This is my bio pulled from state";
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

  async UpdateProfile(){
    if(this.fileToUpload){
      try{
        const url = await this.onUpload(this.fileToUpload);
        console.log(`This is the url: ${url}`);
      }catch (error){
        console.error("Error uploading image", error);
      }
    }
    
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
      this.fileToUpload = event.target.files[0];
    }
  }

  async onUpload(file: File) {
    // Add your code to post the image here
    const filePath = `profilePhotos/${new Date().getTime()}_${file.name}`;
    const storage = getStorage();
    const fileRef = ref(storage, filePath);
    // const task = this.storage.uploadByt(filePath, file);
    const task = uploadBytesResumable(fileRef, file);


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

    // return "failure";

  }
}
