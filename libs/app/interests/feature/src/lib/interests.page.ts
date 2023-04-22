import { Component} from '@angular/core';

@Component({
  selector: 'mp-interests',
  templateUrl: './interests.page.html',
  styleUrls: ['./interests.page.scss']
})
export class InterestsPage{
  MyInterests: string[] = ['Adrian', 'Is', 'Handsome'];

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