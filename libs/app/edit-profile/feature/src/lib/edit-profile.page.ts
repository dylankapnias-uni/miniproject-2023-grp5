import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'mp-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss']
})
export class EditProfilePage 
{
  Bio!: string;
  StateBio!: string;
  changed: boolean = false;
  uploadImg: boolean = false;
  imagePreview!: SafeResourceUrl;
  constructor(public r : Router, private sanitizer: DomSanitizer){
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

  UpdateBio(){
    console.log(this.Bio, " Push to state from here");
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
