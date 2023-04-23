import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BuyTime } from '@mp/app/settings/util';
import { Select, Store } from '@ngxs/store';
@Component({
  selector: 'mp-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss']
})
export class ShopPage 
{
  constructor (public r: Router, public store: Store){}

 
  addTime(time:number){
    console.log("Add "+ time +" minutes to the time");
    this.store.dispatch(new BuyTime({time:time, uid:"1"}));
  }
}
