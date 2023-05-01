import { Component} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
//import { IProfile } from '@mp/api/profiles/util';
import { IUserProfile } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
import {IInterests} from '@mp/api/interests/util'


interface IInterestsArray {
  category: string;
  interest: string[];
}

@Component({
  selector: 'mp-interests',
  templateUrl: './interests.page.html',
  styleUrls: ['./interests.page.scss']
})
export class InterestsPage{
  MyInterests: string[] = ['Swimming', 'Dog', 'Food'];
  profile!:IUserProfile;
  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;
  constructor(private store: Store){
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if (profile)
        this.profile = profile;
    });
  }

  interests: IInterestsArray[] = [
    {
      category:'Sports',
      interest:['Cycling', 'Swimming', 'Tennis']
    },
    {
      category:'Food',
      interest:['Vegan', 'Pasta', 'Pizza']
    },
    {
      category:'Music',
      interest:['Rock','Pop','Techo']
    },
    {
      category:'Hobbies',
      interest:['Painting','Hiking', 'Pottery']
    },
    {
      category:'Pets',
      interest:['Hamster', 'Dogs','Cats']
    }
  ];

  removeItem(item: string){
    console.log(item);
    // this.MyInterests = this.MyInterests.filter(i => i !== item);
  }

  addItem(item: string){
    if(this.MyInterests.length == 3)
      return;
    
    this.MyInterests.push(item);
  }

}