import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { BuyTime } from 'libs/app/shop/util/src/lib/shop.actions';

@Component({
  selector: 'mp-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss']
})
export class ShopPage 
{
    constructor (public r: Router,private store: Store)
    {}

    LoadSettingsPage()
    {
      this.r.navigate(['/settings']);
    }
    buyTime(amount: number) {
      this.store.dispatch(new BuyTime(amount));
    }
}

export class ShopComponent {
  constructor(private store: Store) {}

  buyTime(amount: number) {
    this.store.dispatch(new BuyTime(amount));
  }
}
