import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mp-notificationss',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class notificationsPage {

  notifications!: string[];
  matches!: any[];
  constructor(private router: Router){
    this.notifications = ['New match made', 'Your daily time has been added', 'Your time is running out'];
    this.matches = ["https://images.unsplash.com/photo-1609741873305-3208c472c269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80", "https://images.unsplash.com/photo-1609741873305-3208c472c269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80", "https://images.unsplash.com/photo-1609741873305-3208c472c269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"];
  }
  clear(){
    this.notifications = [];
    this.matches = [];
  }

  clearMatch(idx:number){
    this.matches = this.matches.filter((item, index) => index !== idx);
  }

  clearNotification(idx:number){
    this.notifications = this.notifications.filter((item, index) => index !== idx);
  }

  navigate(link:string){
    //fetch the user id with state or sumn
    this.router.navigate([link]);
  }
}