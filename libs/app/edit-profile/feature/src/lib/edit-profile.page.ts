import { Component } from '@angular/core';
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
  constructor(public r : Router){
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
}
