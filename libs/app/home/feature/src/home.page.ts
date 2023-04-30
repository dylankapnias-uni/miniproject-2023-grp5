import { Component } from '@angular/core';
//import { IProfile } from '@mp/api/profiles/util';
import { Router } from '@angular/router';
import { IUserProfile } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HomeState } from '@mp/app/home/data-access';
//import {profile} from './profile.interface';

// I try but I'm bullied :( Alas I am proud of the home page 
import { 
  SwipeAccept,
  SwipeReject,
  FilterCards,
  GetCards
} from '@mp/app/home/util';
import { IUserMatch } from '@mp/api/home/util';

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;
  @Select(HomeState.home) home$!: Observable<Array<IUserMatch> | null>;

  profile!: IUserProfile | null;
  users!: Array<IUserMatch>;
  loaded = false;

  constructor(private router: Router, public store: Store)
  {
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if(profile){
        this.profile = profile;
      }
    });
    
    if(this.profile){
      this.store.dispatch(new GetCards({uid: this.profile.userId}));
      this.home$.subscribe((home) => {
        if(home)
          this.users = home;  
          console.log(this.users);
          console.log(this.loaded);
      });
    }
  }

  startX = 0;
  endX = 0;
  touchStart(evt: any) {
    this.startX = evt.touches[0].pageX;  
  }

  touchMove(evt: any, index: number) {
    const deltaX = this.startX - evt.touches[0].pageX;
    const deg = deltaX/10;
    this.endX = evt.touches[0].pageX;

    (<HTMLStyleElement>document.getElementById("card-"+index)).style.transform = "translateX("+ -deltaX+"px) rotate("+deg+"deg)";

    if(this.endX-this.startX < 0){
      (<HTMLStyleElement>document.getElementById("reject-icon")).style.opacity = String(deltaX/100);
    }else{
      (<HTMLStyleElement>document.getElementById("accept-icon")).style.opacity = String(-deltaX/100);
    }

  }

  openUser(uid: string | undefined | null)
  {
    console.log(uid)
    this.router.navigate(['/other-user/' + uid]);
    setTimeout(() => {
      window.location.reload();
    }, 200)
  }

  touchEnd(index: number, swipedUID: unknown) {
    if(this.endX > 0){
      const strSwipedUID = swipedUID as string;
      const finalX = this.endX - this.startX;
      if(finalX > -100 && finalX < 100){ //Reset Card
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = ".3s";
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transform = "translateX(0px) rotate(0deg)";

        setTimeout(() => {
          (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = "0s";
        }, 350);
      }
      else if(finalX <= -100){//Reject Card
        if(this.profile)
          this.store.dispatch(new SwipeReject({userId: this.profile.userId, swipedUserId : strSwipedUID}));
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = "1s";
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transform = "translateX(-1000px) rotate(-30deg)";

        setTimeout(() => {
          this.users.splice(index, 1);
          if(this.users.length == 1){
            //Repopulate array
            if(this.profile)
              this.store.dispatch(new GetCards({uid: this.profile.userId}));
          }
        }, 100);
      }
      else if(finalX >= 100){  //Accept Card
        if(this.profile)
          this.store.dispatch(new SwipeAccept({userId: this.profile.userId, swipedUserId : strSwipedUID}));
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = "1s";
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transform = "translateX(1000px) rotate(30deg)";

        setTimeout(() => {
          this.users.splice(index, 1);
          if(this.users.length == 1){
            //Repopulate array
            if(this.profile)
              this.store.dispatch(new GetCards({uid: this.profile.userId}));
          }
        }, 100)
      }

      this.startX = 0;
      this.endX = 0;
      (<HTMLStyleElement>document.getElementById("reject-icon")).style.opacity = "0";
      (<HTMLStyleElement>document.getElementById("accept-icon")).style.opacity = "0";
    }
  }
}
