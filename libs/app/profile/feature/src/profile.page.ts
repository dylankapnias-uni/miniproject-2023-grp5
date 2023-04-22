import { Component } from '@angular/core';
import { IProfile } from '@mp/api/profiles/util';
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

// export interface MyObject {
//   id: number;
//   photo: string;
// } 

export class ProfilePage {

  constructor (public r : Router)
  {}

  loadSettingsPage()
  {
    this.r.navigate(['/settings']);
    setTimeout(() => {
      window.location.reload();
    }, 100)
  }
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;

  option = {
    
  }
//   photos : MyObject[] = [{id:1,photo: 'https://images.unsplash.com/photo-1452611545118-2b35b308caf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'},
//   {id:2,photo: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'},
//   {id:3,photo: 'https://images.unsplash.com/photo-1526547319484-63dce467060b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'},
//   {id:4,photo: 'https://images.unsplash.com/photo-1459908676235-d5f02a50184b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'},
//   {id:5,photo: 'https://images.unsplash.com/photo-1536809188428-e8ecf663d0be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'},
// ];

photos: string[] = [
  'https://images.unsplash.com/photo-1452611545118-2b35b308caf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1526547319484-63dce467060b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1459908676235-d5f02a50184b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1536809188428-e8ecf663d0be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
];
}
  // users: Array<any> = [
  //   {
  //     photo:"./assets/images/photo2.jpeg"
  //   },
  //   {
  //     photo: "https://images.unsplash.com/photo-1678489820694-df1b1388dd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  //   },
  //   {
  //     photo: "https://plus.unsplash.com/premium_photo-1678303396253-72e9f330baae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389&q=80"
  //   },
  //   {
  //     photo: "https://images.unsplash.com/photo-1678436682639-17f121b68c8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  //   }
  // ];

  // startX = 0;
  // endX = 0;

  // touchStart(evt: any) {
  //   this.startX = evt.touches[0].pageX;  
  // }

  // touchMove(evt: any, index: number) {
  //   const deltaX = this.startX - evt.touches[0].pageX;
  //   const deg = deltaX/10;
  //   this.endX = evt.touches[0].pageX;

  //   (<HTMLStyleElement>document.getElementById("card-"+index)).style.transform = "translateX("+ -deltaX+"px) rotate("+deg+"deg)";

  //   if(this.endX-this.startX < 0){
  //     (<HTMLStyleElement>document.getElementById("reject-icon")).style.opacity = String(deltaX/100);
  //   }else{
  //     (<HTMLStyleElement>document.getElementById("accept-icon")).style.opacity = String(-deltaX/100);
  //   }

  // }

  
  // touchEnd(index: number) {
  //   if(this.endX > 0){
  //     const finalX = this.endX - this.startX;
  //     if(finalX > -100 && finalX < 100){ //Reset Card
  //       (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = ".3s";
  //       (<HTMLStyleElement>document.getElementById("card-"+index)).style.transform = "translateX(0px) rotate(0deg)";

  //       setTimeout(() => {
  //         (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = "0s";
  //       }, 350);
  //     }
  //     else if(finalX <= -100){ //Reject Card
  //       (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = "1s";
  //       (<HTMLStyleElement>document.getElementById("card-"+index)).style.transform = "translateX(-1000px) rotate(-30deg)";

  //       setTimeout(() => {
  //         this.users.splice(index, 1);
  //         if(this.users.length == 1){
  //           //Repopulate array
  //           this.users.push(              
  //             {
  //               photo: "./assets/images/photo2.jpeg"
  //             },
  //             {
  //               photo: "https://images.unsplash.com/photo-1678436682639-17f121b68c8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  //             },
  //             {
  //               photo: "https://images.unsplash.com/photo-1678489820694-df1b1388dd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  //             },
  //             {
  //               photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
  //             })
  //         }
  //       }, 100);
  //     }
  //     else if(finalX >= 100){  //Accept Card
  //       (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = "1s";
  //       (<HTMLStyleElement>document.getElementById("card-"+index)).style.transform = "translateX(1000px) rotate(30deg)";

  //       setTimeout(() => {
  //         this.users.splice(index, 1);
  //         if(this.users.length == 1){
  //           //Repopulate array
  //           this.users.push(              
  //             {
  //               photo: "./assets/images/photo2.jpeg"
  //             },
  //             {
  //               photo: "https://images.unsplash.com/photo-1678436682639-17f121b68c8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  //             },
  //             {
  //               photo: "https://images.unsplash.com/photo-1678489820694-df1b1388dd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  //             },
  //             {
  //               photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
  //             }
  //             )
  //         }
  //       }, 100);
  //     }
  //   }
  //       this.startX = 0;
  //     this.endX = 0;
  //     // (<HTMLStyleElement>document.getElementById("reject-icon")).style.opacity = "0";
  //     // (<HTMLStyleElement>document.getElementById("accept-icon")).style.opacity = "0";
  //   }
  // }

  // slideOpts = {
  //   initialSlide: 0,
  //   speed: 400
  // };

  // images = [
  //   'https://example.com/image1.jpg',
  //   'https://example.com/image2.jpg',
  //   'https://example.com/image3.jpg'
  // ];