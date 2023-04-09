import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mp-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage {
  constructor (public r : Router)
  {}

  LoadAccountPage()
  {
    this.r.navigate(['/account']);
  }

  LoadEditProfilePage()
  {
    this.r.navigate(['/edit-profile']);
  }

  LoadPrivacyPage()
  {
    this.r.navigate(['/privacy']);
  }

  LoadShopPage()
  {
    this.r.navigate(['/shop']);
  }

  LoadAboutPage()
  {
    this.r.navigate(['/about']);
  }

  LogOut()
  {
    this.r.navigate(['/login']);
  }




}
