import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BuyTime } from '@mp/app/settings/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProfileState } from '@mp/app/profile/data-access';
//import { IProfile } from '@mp/api/profiles/util';
import { IUserProfile } from '@mp/api/users/util';
@Component({
  selector: 'mp-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss']
})
export class ShopPage 
{
  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;
  profile!: IUserProfile | null;
  constructor (public r: Router, public store: Store){
    this.profile$.subscribe((profile) => {
      if(profile != null){
        this.profile = profile;
      }
    });
  }
  
  addTime(time:number){
    console.log("Add "+ time +" minutes to the time");
    const t = (time*60);
    if(this.profile)
      this.store.dispatch(new BuyTime({time: t, uid:this.profile.userId}));
  }
}
