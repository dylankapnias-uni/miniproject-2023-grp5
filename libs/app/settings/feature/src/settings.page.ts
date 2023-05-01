import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { CreateSetting, Logout } from '@mp/app/settings/util';
import { Logout } from '@mp/app/auth/util';
import { Store, Select } from '@ngxs/store';
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

  LogOut(){
    this.store.dispatch(new Logout());
    //this.r.navigate(['/login']);
  }
}
