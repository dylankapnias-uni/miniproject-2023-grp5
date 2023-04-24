import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { 
    ISendNotificationRequest,
    ISendNotificationResponse,
    IDeleteNotificationRequest,
    IDeleteNotificationResponse,
    ICreateNotificationRequest,
    ICreateNotificationResponse,
    IClearNotificationsRequest,
    IClearNotificationsResponse,
} from '@mp/api/notifications/util';


@Injectable()
export class SettingsApi {
    constructor(
        private readonly firestore: Firestore,
        private readonly functions: Functions
    ) {}

    async SendNotification(request: ISendNotificationRequest){
        return await httpsCallable<
            ISendNotificationRequest,
            ISendNotificationResponse
        >(
            this.functions,
            'SendNotification'
        )(request)
    }

    async DeleteNotfication(request: IDeleteNotificationRequest){
        return await httpsCallable<
            IDeleteNotificationRequest,
            IDeleteNotificationResponse
        >(
            this.functions,
            'DeleteNotification'
        )(request)
    }

    async CreateNotification(request: ICreateNotificationRequest){
        return await httpsCallable<
            ICreateNotificationRequest,
            ICreateNotificationResponse
        >(
            this.functions,
            'CreateNotification'
        )(request)
    }

    async ClearNotifications(resquest: IClearNotificationsRequest)
    {
        return await httpsCallable<
            IClearNotificationsRequest,
            IClearNotificationsResponse
        >(
            this.functions,
            'ClearNotifications'
        )(resquest)    
    }
}
