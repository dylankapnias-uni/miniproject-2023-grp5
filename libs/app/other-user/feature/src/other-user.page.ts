import { Component } from '@angular/core';
//import { IProfile } from '@mp/api/profiles/util';
import { IUserProfile } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { ChatState } from '@mp/app/chat/data-access';
import { SetProfile, SubscribeToProfile } from '@mp/app/profile/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { GetUser } from '@mp/app/chat/util';
//import {profile} from './profile.interface';

@Component({
  selector: 'ms-profile-page',
  templateUrl: './other-user.page.html',
  styleUrls: ['./other-user.page.scss'],
})

// export interface MyObject {
//   id: number;
//   photo: string;
// } 

export class OtherUserPage {
  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;
  @Select(ChatState.homeOtherUser) other$!: Observable<IUserProfile | null>;

  profile!: IUserProfile | null;

  id!:any;
  interests: string[] = ['Swimming', 'Dog', 'Food'];
  
  constructor (public r : Router, private route: ActivatedRoute, public store: Store){
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("Other User ID:" + this.id);
    this.store.dispatch(new GetUser({ouid:this.id}));
    this.other$.subscribe((otherUser) => {
      if (otherUser)
        this.profile = otherUser;
    });
    //this.id = this.store.dispatch(new )
    //this.store.dispatch(new SetProfile());
    //this.store.dispatch(new SubscribeToProfile());
    //this.dispatch(new SubscribeToProfile());
    //this.profile$.subscribe((profile) => {
      //if (profile)
        //this.profile = profile;
    //});
    //console.log(this.id);
  }

  loadSettingsPage()
  {
    this.r.navigate(['/settings']);
    setTimeout(() => {
      window.location.reload();
    }, 100)
  }
  //@Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;

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
  