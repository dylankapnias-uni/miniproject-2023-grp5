import { Component } from '@angular/core';
//import { IProfile } from '@mp/api/profiles/util';
import { IUserProfile } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
//import {profile} from './profile.interface';

@Component({
  selector: 'ms-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})



export class ProfilePage {
  interests: string[] = ['Swimming', 'Dog', 'Food'];
  //name : string | undefined;

  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;
  profile!: IUserProfile | null;

  constructor (public r : Router, public store: Store){
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if (profile)
        this.profile = profile;
    });

    /*if(this.profile?.name != null)
    {
      this.name = this.profile?.name;
    }*/
  }

  loadSettingsPage()
  {
    this.r.navigate(['/settings']);
    setTimeout(() => {
      window.location.reload();
    }, 100)
  }
  
  convertTime()
  {
    if(this.profile?.time)
    {
      const seconds = this.profile?.time;
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const timeFormat = `${minutes}min ${remainingSeconds}s`;
      return timeFormat;
    }

    return null;
  }

  option = {
    
  }

  photos: string[] = [
    'https://images.unsplash.com/photo-1452611545118-2b35b308caf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1526547319484-63dce467060b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1459908676235-d5f02a50184b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1536809188428-e8ecf663d0be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  ];
}