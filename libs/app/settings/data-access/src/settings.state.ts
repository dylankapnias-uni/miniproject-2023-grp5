import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import { CreateSetting } from '@mp/app/settings/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { httpsCallable, Functions } from '@angular/fire/functions';
// import { SettingsService } from '@mp/api/settings/feature';
import { IAddTimeRequest, 
    IAddTimeResponse, 
    IBlockUserRequest, 
    IBlockUserResponse, 
    ICreateSettingsRequest, 
    ICreateSettingsResponse, 
    IGetVisibilityRequest, 
    IGetVisibilityResponse, 
    IIsBlockedRequest, 
    IIsBlockedResponse, 
    ISubtractTimeRequest, 
    ISubtractTimeResponse, 
    IUnblockUserRequest, 
    IUnblockUserResponse, 
    IUpdatePrivacyRequest, 
    IUpdatePrivacyResponse, 
    ProfilePrivacy 
} from '@mp/api/settings/util';

import { IClearNotificationsRequest, IClearNotificationsResponse, ICreateNotificationRequest, ICreateNotificationResponse, IDeleteNotificationRequest, IDeleteNotificationResponse, ISendNotificationRequest, ISendNotificationResponse } from '@mp/api/notifications/util'
import { SettingsApi } from './settings.api'
import { Timestamp } from '@angular/fire/firestore';
export interface SettingsStateModel {
    messages: string[];
}

@State<SettingsStateModel>({
    name: 'settings',
    defaults: {
        messages: []
    },
})
@Injectable()
export class SettingsState {
    constructor(private readonly functions: Functions, private readonly settingsApi: SettingsApi) {}
    @Action(CreateSetting)
    async createSettings(ctx: StateContext<SettingsStateModel>, {payload}: CreateSetting) {

        /*
            Very very very scuffed, please ignore :(
        */


        // Create settings document for user 5
        let createSettingsResponse = await httpsCallable<
            ICreateSettingsRequest,
            ICreateSettingsResponse
        >(
            this.settingsApi.functions, 
            'createSettings'
        )({userId: '5'});
        console.log(createSettingsResponse.data);

        // Create settings document for user 6
        createSettingsResponse = await httpsCallable<
        ICreateSettingsRequest,
        ICreateSettingsResponse
        >(
            this.settingsApi.functions, 
            'createSettings'
        )({userId: '6'});
        console.log(createSettingsResponse.data);

        // // User 6 blocks user 5
        // let blockUserResponse = await httpsCallable<
        //     IUnblockUserRequest,
        //     IUnblockUserResponse
        // >(
        //     this.settingsApi.functions, 
        //     'blockUser'
        // )({userId: '6', blockedUserId: '5'});
        // console.log(blockUserResponse.data);
        
        // // Check if user 5 is blocked by user 6
        // let isBlockedResponse = await httpsCallable<
        //     IIsBlockedRequest,
        //     IIsBlockedResponse
        // >(
        //     this.functions,
        //     'isBlocked'
        // )({userId: '6', blockedId: '5'});
        // console.log(isBlockedResponse.data);

        // // User 6 unblocks user 5
        // blockUserResponse = await httpsCallable<
        //     IUnblockUserRequest,
        //     IUnblockUserResponse
        // >(
        //     this.settingsApi.functions, 
        //     'unblockUser'
        // )({userId: '6', blockedUserId: '5'});
        // console.log(blockUserResponse.data);
        
        // // Check if user 5 is blocked by user 6
        // isBlockedResponse = await httpsCallable<
        //     IIsBlockedRequest,
        //     IIsBlockedResponse
        // >(
        //     this.functions,
        //     'isBlocked'
        // )({userId: '6', blockedId: '5'});
        // console.log(isBlockedResponse);

        // // User 5 buys 10000 time
        // let addTimeResponse = await httpsCallable<
        //     IAddTimeRequest,
        //     IAddTimeResponse
        // >(
        //     this.settingsApi.functions,
        //     'addTime'
        // )({
        //     userId: '5', 
        //     purchaseAmount: 10000
        // });
        // console.log(addTimeResponse.data);

        // // User 6 buys 20000 time
        // addTimeResponse = await httpsCallable<
        //     IAddTimeRequest,
        //     IAddTimeResponse
        // >(
        //     this.settingsApi.functions,
        //     'addTime'
        // )({
        //     userId: '6', 
        //     purchaseAmount: 20000
        // });
        // console.log(addTimeResponse.data);

        // // User 6 uses 4000 time
        // let subtractTimeResponse = await httpsCallable<
        //     ISubtractTimeRequest,
        //     ISubtractTimeResponse
        // >(
        //     this.settingsApi.functions,
        //     'subtractTime'
        // )({
        //     userId: '6', 
        //     amount: 4000
        // });
        // console.log(subtractTimeResponse.data);

        // // User 6 uses 200 time
        // subtractTimeResponse = await httpsCallable<
        //     ISubtractTimeRequest,
        //     ISubtractTimeResponse
        // >(
        //     this.settingsApi.functions,
        //     'subtractTime'
        // )({
        //     userId: '5', 
        //     amount: 200
        // });
        // console.log(subtractTimeResponse.data);
        
        // // User 6 changes profile visibility to Friends-Only
        // let updateVisibilityResponse = await httpsCallable<
        //     IUpdatePrivacyRequest,
        //     IUpdatePrivacyResponse
        // >(
        //     this.settingsApi.functions,
        //     'updateProfileVisibility'
        // )({
        //     userId: '6', 
        //     profileVisibility: ProfilePrivacy.FRIENDS
        // });
        // console.log(updateVisibilityResponse.data);

        // // Get the the profile visibility of user 6
        // const getVisibilityResponse = await httpsCallable<
        //     IGetVisibilityRequest,
        //     IGetVisibilityResponse
        // >(
        //     this.settingsApi.functions,
        //     'updateProfileVisibility'
        // )({
        //     userId: '6'
        // });
        // console.log(getVisibilityResponse.data);

        // // User 6 changes profile visibility to Everyone
        // updateVisibilityResponse = await httpsCallable<
        //     IUpdatePrivacyRequest,
        //     IUpdatePrivacyResponse
        // >(
        //     this.settingsApi.functions,
        //     'updateProfileVisibility'
        // )({
        //     userId: '6', 
        //     profileVisibility: ProfilePrivacy.EVERYONE
        // });
        // console.log(updateVisibilityResponse.data);

        let createNotificationResponse = await httpsCallable<
        ICreateNotificationRequest,
        ICreateNotificationResponse
        >(
            this.settingsApi.functions, 
            'CreateNotification'
        )({userId: '5'});
        console.log(createNotificationResponse.data);

        createNotificationResponse = await httpsCallable<
        ICreateNotificationRequest,
        ICreateNotificationResponse
        >(
            this.settingsApi.functions, 
            'CreateNotification'
        )({userId: '6'});
        console.log(createNotificationResponse.data);


        let sendNotificationResponse = await httpsCallable<
        ISendNotificationRequest,
        ISendNotificationResponse
        >(
            this.settingsApi.functions, 
            'SendNotification'
        )({userId: '5', inbox:{content:'test',recipient:'6',sender:'5',time:Timestamp.fromDate(new Date())}});
        console.log(sendNotificationResponse.data);

        sendNotificationResponse = await httpsCallable<
        ISendNotificationRequest,
        ISendNotificationResponse
        >(
            this.settingsApi.functions, 
            'SendNotification'
        )({userId: '6', inbox:{content:'test2',recipient:'5',sender:'6',time:Timestamp.fromDate(new Date())}});
        console.log(sendNotificationResponse.data);
        
        sendNotificationResponse = await httpsCallable<
        ISendNotificationRequest,
        ISendNotificationResponse
        >(
            this.settingsApi.functions, 
            'SendNotification'
        )({userId: '5', inbox:{content:'test3',recipient:'6',sender:'5',time:Timestamp.fromDate(new Date())}});
        console.log(sendNotificationResponse.data);
        // const deleteNotificationResponse = await httpsCallable<
        // IDeleteNotificationRequest,
        // IDeleteNotificationResponse
        // >(
        //     this.settingsApi.functions, 
        //     'DeleteNotification'
        // )({userId: '6',inboxId:0});
        // console.log(deleteNotificationResponse.data);

        const clearNotificationResponse = await httpsCallable<
        IClearNotificationsRequest,
        IClearNotificationsResponse
        >(
            this.settingsApi.functions, 
            'ClearNotifications'
        )({userId: '6'});
        console.log(clearNotificationResponse.data);

        /*this.srvc.createSettings({userId: '1234'}).then((data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
        });*/
        ctx.patchState({
            //messages: MessagesState.chats
        })

        


    }

  @Selector()
  static settings(state: SettingsStateModel) 
  {
    return state.messages;
  }

}