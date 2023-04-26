import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BuyTime } from '@mp/app/settings/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProfileState } from '@mp/app/profile/data-access';
import { IProfile } from '@mp/api/profiles/util';
@Component({
  selector: 'mp-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss']
})
export class ShopPage 
{
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  profile!: IProfile | null;
  constructor (public r: Router, public store: Store){
    this.profile$.subscribe((profile) => {
      if(profile != null){
        this.profile = profile;
      }
    });
  }
  
  addTime(time:number){
    console.log("Add "+ time +" minutes to the time");
    if(this.profile)
      this.store.dispatch(new BuyTime({time:time, uid:this.profile.userId}));
  }
}
