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

  add5Minutes()
  {
    console.log("Add 5 minutes to the time");
  }

  add10Minutes()
  {
    console.log("Add 10 minutes to the time");
  }

  add15Minutes()
  {
    console.log("Add 15 minutes to the time");
  }

  add30Minutes()
  {
    console.log("Add 30 minutes to the time");
  }

  add60Minutes()
  {
    console.log("Add 60 minutes to the time");
  }
}
