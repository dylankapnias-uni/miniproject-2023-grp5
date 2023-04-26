import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonPopover } from '@ionic/angular';
import { UpdateAccount, DeleteAccount } from '@mp/app/settings/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';

@Component({
  selector: 'mp-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss']
})
export class AccountPage 
{
  uid!: string;
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  constructor(public r : Router, public alertController:AlertController, private store: Store){
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if(profile != null)
        this.uid = profile.userId;
    });
    //Fetch these from state
    this.dob = '2002-10-07'+'T21:50:00+02:00';
    this.name = 'John';
    this.email = 'Email@gmail.com';
    this.phone = '1234567890';
    this.gender = 'Other';
    this.sexuality = 'heterosexual';
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
  sexuality!: string;

  LoadSettingsPage()
  {
    this.r.navigate(['/settings'])
  }

  deleteAccount(){
    this.store.dispatch(new DeleteAccount({uid:"1"}));
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
    console.log(this.sexuality);
    console.log(dateString);
  }

}
