import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mp-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss']
})
export class AccountPage 
{
  constructor(public r : Router)
  {}

  LoadSettingsPage()
  {
    this.r.navigate(['/settings'])
  }
}
