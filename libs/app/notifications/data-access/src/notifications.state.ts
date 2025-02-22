import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import {
    SetNotifications,
    RemoveAllNotifications,
    RemoveNotification,
    FetchNotifications
}
from '@mp/app/notifications/util';
import { 
  ISendNotificationRequest,
  ISendNotificationResponse,
  IDeleteNotificationRequest,
  IDeleteNotificationResponse,
  ICreateNotificationRequest,
  ICreateNotificationResponse,
  IClearNotificationsRequest,
  IClearNotificationsResponse,
  IFetchNotificationsRequest,
  IFetchNotificationsResponse,
} from '@mp/api/notifications/util';
import { NotificationsApi } from './notifications.api';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { INotification } from '@mp/api/notifications/util';
import { IInbox } from '@mp/api/notifications/util';

export interface NotificationsStateModel {
    NotificationForm:{
      model:{
        notifications: INotification | null;
      },
      dirty: false;
      status: string;
      errors: object;
    }
}

@State<NotificationsStateModel>({
    name: 'notifications',
    defaults: {
        NotificationForm:{
          model:{
            notifications: null
          },
          dirty: false,
          status: '',
          errors: {}
        }
    },
})
@Injectable()
export class NotificationsState {
   
  constructor(private notificationsApi: NotificationsApi) {}
  @Action(SetNotifications)
  async SetNotifications(ctx: StateContext<NotificationsStateModel> , {payload}: SetNotifications) {
    //Query api here
    //this.api.getChats()
    

    ctx.patchState({
      NotificationForm:{
        model:{
          //Call api here
          notifications: null
        },
        dirty: false,
        status: '',
        errors: {}
      }
    })
  }

  @Action(RemoveNotification)
  async RemoveNotification(ctx: StateContext<NotificationsStateModel>, {payload}: RemoveNotification) {
    //Query api here
    //Make call to api to remove notification

    //Filter state to remove notification to avoid performance issues by making another unnecesary call to the api
    const request: IDeleteNotificationRequest = {
      userId: payload.uid,
      inboxId: payload.inbox
    };

    const response = await this.notificationsApi.DeleteNotfication(request);
    const rsps = response.data;

    ctx.patchState({
      NotificationForm:{
        model:{
          notifications: null
        },
        dirty: false,
        status: '',
        errors: {}
      }
    })
  }

  @Action(RemoveAllNotifications)
  async RemoveAllNotifications(ctx: StateContext<NotificationsStateModel>, {payload}: RemoveAllNotifications) {
    //Query api here

    //Make call to api to remove all notifications
    //Make new object to avoid performance issues by making another unnecesary call to the api
    const request: IClearNotificationsRequest = {
      userId: payload.uid

    };
    const response = await this.notificationsApi.ClearNotifications(request);
    const rsps = response.data;
  
    const notification: INotification = {
      userId: payload.uid,
      inbox: []
    };
    ctx.patchState({
      NotificationForm:{
        model:{
          notifications: rsps.notification,
        },
        dirty: false,
        status: '',
        errors: {}
      }
    })
  }

  @Action(FetchNotifications)
  async FetchNotifications(ctx: StateContext<NotificationsStateModel>, {payload}: FetchNotifications) {

    const state = ctx.getState();
    const request: IFetchNotificationsRequest = {
      userId: payload.uid
    };

    const response = await this.notificationsApi.FetchNotifications(request);
    const rsps = response.data;
    console.log("Here");   
    console.log(rsps);
    

    ctx.patchState({
      NotificationForm:{
        model:{
          notifications: rsps.notifications,
        },
        dirty: false,
        status: '',
        errors: {}
      }
    })
  }

  @Selector()
  static notifications(state: NotificationsStateModel) {
    return state.NotificationForm.model.notifications;
  }

}