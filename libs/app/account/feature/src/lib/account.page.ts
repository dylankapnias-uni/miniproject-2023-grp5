import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'mp-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss']
})
export class AccountPage 
{
  constructor(public r : Router, public alertController:AlertController)
  {}

  LoadSettingsPage()
  {
    this.r.navigate(['/settings'])
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
          // handler: () => {
          //   this.deleteAccount();
          // }
        }
      ],
    });

    await alert.present();
  }

}
