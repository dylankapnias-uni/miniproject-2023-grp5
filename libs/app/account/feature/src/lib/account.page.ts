import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonPopover } from '@ionic/angular';

@Component({
  selector: 'mp-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss']
})
export class AccountPage 
{
  constructor(public r : Router, public alertController:AlertController){
    //Fetch these from state
    this.dob = '2002-10-07'+'T21:50:00+02:00';
    this.name = 'John';
    this.email = 'Email@gmail.com';
    this.phone = '1234567890';
    this.gender = 'Other';
  }
  @ViewChild('popover', { static: false }) popover!: IonPopover;

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  name!: string;
  email!: string;
  phone!: string;
  gender!: string;
  dob!: string;

  LoadSettingsPage()
  {
    this.r.navigate(['/settings'])
  }

  deleteAccount(){
    console.log("Account Deleted");
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.deleteAccount();
          }
        }
      ],
    });
    await alert.present();
  }
  Update(){
    const dateString = this.dob.split('T')[0];
    console.log(dateString);
  }

}
