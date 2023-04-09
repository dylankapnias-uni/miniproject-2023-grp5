import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mp-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss']
})
export class EditProfilePage 
{
  constructor(public r : Router)
  {}

  LoadSettingsPage()
  {
    this.r.navigate(['/settings'])
  }
}
