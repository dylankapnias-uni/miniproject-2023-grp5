import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'mp-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss']
})
export class ShopPage 
{
    constructor (public r: Router)
    {}

    LoadSettingsPage()
    {
      this.r.navigate(['/settings']);
    }
}
