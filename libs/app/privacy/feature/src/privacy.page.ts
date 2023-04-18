import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ms-privacy-page',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage {

  constructor (public r : Router)
  {}

  LoadSettingsPage()
  {
    this.r.navigate(['/settings']);
  }
}
