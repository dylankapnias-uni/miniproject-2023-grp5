import { Component} from '@angular/core';

@Component({
  selector: 'mp-interests',
  templateUrl: './interests.page.html',
  styleUrls: ['./interests.page.scss']
})
export class InterestsPage{

  SportsArr = ['Cycling', 'Swimming', 'Tennis'];
  FoodArr = ['Vegan', 'Meat', 'Vegetarian'];
  MusicArr = ['Rock','Pop','Techo'];
  HobbiesArr = ['Painting','Hiking', 'Pottery'];
  PetsArr = ['Hamster', 'Dogs','Cats'];

}