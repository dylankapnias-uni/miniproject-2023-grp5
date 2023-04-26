import { Component} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';

@Component({
  selector: 'mp-interests',
  templateUrl: './interests.page.html',
  styleUrls: ['./interests.page.scss']
})
export class InterestsPage{
  MyInterests: string[] = ['Adrian', 'Is', 'Handsome'];
  uid!:string;
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  constructor(private store: Store){
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if (profile)
        this.uid = profile.userId;
    });
  }

  interests: any[] = [
    {
      catagory:'Sports',
      content:['Cycling', 'Swimming', 'Tennis']
    },
    {
      catagory:'Food',
      content:['Vegan', 'Pasta', 'Pizza']
    },
    {
      catagory:'Music',
      content:['Rock','Pop','Techo']
    },
    {
      catagory:'Hobbies',
      content:['Painting','Hiking', 'Pottery']
    },
    {
      catagory:'Pets',
      content:['Hamster', 'Dogs','Cats']
    }
  ];

  removeItem(item: string){
    this.MyInterests = this.MyInterests.filter(i => i !== item);
  }

  addItem(item: string){
    if(this.MyInterests.length == 3)
      return;
    
    this.MyInterests.push(item);
  }

}