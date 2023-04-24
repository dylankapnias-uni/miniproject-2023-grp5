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

 
  addTime(time:number){
    console.log("Add "+ time +" minutes to the time");
  }
}
