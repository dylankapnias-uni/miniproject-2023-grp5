import { Component } from '@angular/core';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {profile} from './profile.interface';

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  array_profile !: profile [];

 

  deleteItem()
  {

  }

  constructor(private readonly store: Store) {
    this.array_profile = [{name : "Emily", age : 23, interests: ["At Uni", "Aries", "Vegan"]}, {name : "Emily", age : 23, interests: ["At Uni", "Aries", "Vegan"]}];
  }

  ionViewWillEnter() 
  {
    this.store.dispatch(new SubscribeToProfile());
  }
}
