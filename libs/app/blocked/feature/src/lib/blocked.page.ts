import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'mp-blocked',
  templateUrl: './blocked.page.html',
  styleUrls: ['./blocked.page.scss']
})
export class BlockedPage {
  constructor(public r : Router)
  {}

  LoadSettingsPage()
  {
    this.r.navigate(['/settings'])
  }
}
