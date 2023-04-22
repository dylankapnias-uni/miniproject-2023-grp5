import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'mp-blocked',
  templateUrl: './blocked.page.html',
  styleUrls: ['./blocked.page.scss']
})
export class BlockedPage {
  constructor(public r : Router)
  {}

  users: any[] = [
    { id: '1', name: 'John', age: 25, job: 'Designer', employed: true },
    { id: '2', name: 'Jill', age: 26, job: 'Engineer', employed: true },
    { id: '3', name: 'Elyse', age: 24, job: 'Engineer', employed: false },
  ];

  unblock(id:string){
    console.log(id);
  }

  LoadSettingsPage()
  {
    this.r.navigate(['/settings'])
  }
}
