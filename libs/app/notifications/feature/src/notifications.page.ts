import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  SetNotifications,
  RemoveAllNotifications,
  RemoveNotification,
  FetchNotifications
}
from '@mp/app/notifications/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NotficationsModule, NotificationsState, NotificationsStateModel } from '@mp/app/notifications/data-access';
//import { IProfile } from '@mp/api/profiles/util';
import { IUserProfile } from '@mp/api/users/util';
import { Block } from '@mp/app/settings/util';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { INotification } from '@mp/api/notifications/util';

@Component({
  selector: 'mp-notificationss',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class notificationsPage {
  @Select(NotificationsState.notifications) notifications$!: Observable<INotification>;
  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;
  
  notification!: INotification;
  matches!: any[];
  profile!: IUserProfile | null;
  constructor(private router: Router, private store: Store){
    //this.notifications = ['New match made', 'Your daily time has been added', 'Your time is running out'];
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if (profile)
        this.profile = profile;
    });
    
    this.matches = ["https://images.unsplash.com/photo-1609741873305-3208c472c269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80", "https://images.unsplash.com/photo-1609741873305-3208c472c269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80", "https://images.unsplash.com/photo-1609741873305-3208c472c269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"];
    
    if(this.profile) {
      this.store.dispatch(new FetchNotifications({uid: this.profile.userId}));
      this.notifications$.subscribe((model) => {
        if(model != null){
          this.notification = model;
          //this.chats = notifications;
          //this.noChats = this.chats.length === 0;
        }

        else if(model == null)
        {
            console.log("No notifications");
        }
      });
    }
   
  }
  clear(){
    if(this.profile)
    this.store.dispatch(new RemoveAllNotifications({uid: this.profile?.userId}));
  }

  clearMatch(idx:number){
    this.matches = this.matches.filter((item, index) => index !== idx);
  }

  clearNotification(idx:number){
    this.notification.inbox?.splice(idx, 1);
    if(this.profile && this.notification.inbox)
    this.store.dispatch(new RemoveNotification({uid: this.profile?.userId, inbox: idx}));
  }

  navigate(link:string){
    //fetch the user id with state or sumn
    this.router.navigate([link]);
  }
}