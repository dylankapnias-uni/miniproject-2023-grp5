import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mp-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage 
{
  constructor (public r: Router)
  {}

  LoadSettingsPage()
  {
    this.r.navigate(['/settings']);
  }
}
