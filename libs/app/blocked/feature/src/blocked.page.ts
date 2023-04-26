import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { SettingsState } from '@mp/app/settings/data-access';
import { Observable } from 'rxjs';
import {
  Unblock,
  GetBlocked
}
from '@mp/app/settings/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { IProfile } from '@mp/api/profiles/util';


@Component({
  selector: 'mp-blocked',
  templateUrl: './blocked.page.html',
  styleUrls: ['./blocked.page.scss']
})
export class BlockedPage {
  @Select(SettingsState.blocked) blocked$!: Observable<string[]>;
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  profile!: IProfile | null;
  constructor(public r : Router, private store: Store){
    this.profile$.subscribe((profile) => {
      if(profile != null)
        this.profile = profile;
    });
    if(this.profile)
      this.store.dispatch(new GetBlocked({uid:this.profile.userId}));
  }

  users: any[] = [
    { id: '1', name: 'John', age: 25, job: 'Designer', employed: true },
    { id: '2', name: 'Jill', age: 26, job: 'Engineer', employed: true },
    { id: '3', name: 'Elyse', age: 24, job: 'Engineer', employed: false },
  ];

  unblock(id:string){
    this.store.dispatch(new Unblock({uid:id, unblockId: '1'}));
  }

  LoadSettingsPage()
  {
    this.r.navigate(['/settings'])
  }
}
