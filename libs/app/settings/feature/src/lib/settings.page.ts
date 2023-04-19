import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateSetting } from '@mp/app/settings/util';
import { Store, Selector, Select } from '@ngxs/store';
import { SettingsState } from '@mp/app/settings/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'mp-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage {
  constructor (public r : Router, private store: Store)
  {}
  @Select(SettingsState.settings) settings$!: Observable<string[]>;


  LoadAccountPage()
  {
   // this.r.navigate(['/account']);

    this.store.dispatch(new CreateSetting({id:'6'}));
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
