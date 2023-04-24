import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import {
    SetNotifications,
    RemoveAllNotifications,
    RemoveNotification
}
from '@mp/app/notifications/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { INotification } from './notifications.interface'


export interface NotificationsStateModel {
    NotificationForm:{
      model:{
        notifications: INotification | null;
      }
    }
}

@State<NotificationsStateModel>({
    name: 'notifications',
    defaults: {
        NotificationForm:{
          model:{
            notifications: null
          }
        }
    },
})
@Injectable()
export class NotificationsState {
   
  //constructor() {}
  @Action(SetNotifications)
  async SetNotifications(ctx: StateContext<NotificationsStateModel>) {
    //Query api here
    //this.api.getChats()
    ctx.patchState({
      NotificationForm:{
        model:{
          //Call api here
          notifications: null
        }
      }
    })
  }

  @Action(RemoveNotification)
  async RemoveNotification(ctx: StateContext<NotificationsStateModel>, {payload}: RemoveNotification) {
    //Query api here
    //Make call to api to remove notification

    //Filter state to remove notification to avoid performance issues by making another unnecesary call to the api
    ctx.patchState({
      NotificationForm:{
        model:{
          notifications: null
        }
      }
    })
  }

  @Action(RemoveAllNotifications)
  async RemoveAllNotifications(ctx: StateContext<NotificationsStateModel>, {payload}: RemoveAllNotifications) {
    //Query api here

    //Make call to api to remove all notifications
    //Make new object to avoid performance issues by making another unnecesary call to the api
    const notification: INotification = {
      userID: payload.uid,
      inbox: []
    };
    ctx.patchState({
      NotificationForm:{
        model:{
          notifications: notification
        }
      }
    })
  }

  @Selector()
  static notifications(state: NotificationsStateModel) 
  {
    return state.NotificationForm.model.notifications;
  }

}