import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavBarComponent{
  showNavbar!: boolean;
  constructor(private router: Router) {}
  hasRoute(route: string) {
    return this.router.url === route;
  }
  navigate(page:string){
    //This gives errors for now as we need to implement all the routes properly
    this.router.navigate([page]);
  }
}
