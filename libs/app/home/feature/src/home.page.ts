import { Component } from '@angular/core';
//import { IProfile } from '@mp/api/profiles/util';
import { IUserProfile } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
//import {profile} from './profile.interface';
import { 
  SwipeAccept,
  SwipeReject,
  FilterCards
} from '@mp/app/home/util';

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;
  constructor(public store: Store){}
  users: Array<any> = [
    {
      id: 1,
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
      name: 'Emily',
      age: 22,
      interests: ["At Uni", "Aries", "Vegan"]
    },
    {
      id:2,
      photo: "https://images.unsplash.com/photo-1678489820694-df1b1388dd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      name: 'John',
      age: 21,
      interests: ["At Uni", "Aries", "Vegan"]
    },
    {
      id:3,
      photo: "https://plus.unsplash.com/premium_photo-1678303396253-72e9f330baae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389&q=80",
      name: 'Jessica',
      age: 25,
      interests: ["At Uni", "Aries", "Vegan"]
    },
    {
      id:4,
      photo: "https://images.unsplash.com/photo-1678436682639-17f121b68c8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      name: 'Chris',
      age: 35,
      interests: ["At Uni", "Aries", "Vegan"]
    }
  ];

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

  touchEnd(index: number) {
    if(this.endX > 0){
      const finalX = this.endX - this.startX;
      if(finalX > -100 && finalX < 100){ //Reset Card
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = ".3s";
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transform = "translateX(0px) rotate(0deg)";

        setTimeout(() => {
          (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = "0s";
        }, 350);
      }
      else if(finalX <= -100){ //Reject Card
        const t = this.users[index].id;
        //this.store.dispatch(new SwipeReject({uid:t}));
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = "1s";
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transform = "translateX(-1000px) rotate(-30deg)";

        setTimeout(() => {
          this.users.splice(index, 1);
          if(this.users.length == 1){
            //Repopulate array
            this.users.push(              
              {
                id:3,
                photo: "https://plus.unsplash.com/premium_photo-1678303396253-72e9f330baae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389&q=80",
                name: 'Jessica',
                age: 25,
                interests: ["At Uni", "Aries", "Vegan"]
              },
              {
                id:4,
                photo: "https://images.unsplash.com/photo-1678436682639-17f121b68c8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                name: 'Chris',
                age: 35,
                interests: ["At Uni", "Aries", "Vegan"]
              },
              {
                id:2,
                photo: "https://images.unsplash.com/photo-1678489820694-df1b1388dd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                name: 'John',
                age: 21,
                interests: ["At Uni", "Aries", "Vegan"]
              },
              {
                id:1,
                photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
                name: 'Emily',
                age: 22,
                interests: ["At Uni", "Aries", "Vegan"]
              })
          }
        }, 100);
      }
      else if(finalX >= 100){  //Accept Card
        const t = this.users[index].id;
        //this.store.dispatch(new SwipeAccept({uid:t}));
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = "1s";
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transform = "translateX(1000px) rotate(30deg)";

        setTimeout(() => {
          this.users.splice(index, 1);
          if(this.users.length == 1){
            //Repopulate array
            this.users.push(              
              {
                id:3,
                photo: "https://plus.unsplash.com/premium_photo-1678303396253-72e9f330baae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389&q=80",
                name: 'Jessica',
                age: 25,
                interests: ["At Uni", "Aries", "Vegan"]
              },
              {
                id:4,
                photo: "https://images.unsplash.com/photo-1678436682639-17f121b68c8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                name: 'Chris',
                age: 35,
                interests: ["At Uni", "Aries", "Vegan"]
              },
              {
                id:2,
                photo: "https://images.unsplash.com/photo-1678489820694-df1b1388dd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                name: 'John',
                age: 21,
                interests: ["At Uni", "Aries", "Vegan"]
              },
              {
                id:1,
                photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
                name: 'Emily',
                age: 22,
                interests: ["At Uni", "Aries", "Vegan"]
              })
          }
        }, 100);
      }

      this.startX = 0;
      this.endX = 0;
      (<HTMLStyleElement>document.getElementById("reject-icon")).style.opacity = "0";
      (<HTMLStyleElement>document.getElementById("accept-icon")).style.opacity = "0";
    }
  }
}
