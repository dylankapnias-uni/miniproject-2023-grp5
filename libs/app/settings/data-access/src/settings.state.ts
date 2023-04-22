import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import { CreateSetting, CreateUserProfile, DeleteUserProfile, GetUserProfile, UpdateUserProfile } from '@mp/app/settings/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { httpsCallable, Functions } from '@angular/fire/functions';
// import { SettingsService } from '@mp/api/settings/feature';
import { IAddTimeRequest, 
    IAddTimeResponse, 
    IBlockUserRequest, 
    IBlockUserResponse, 
    ICreateSettingsRequest, 
    ICreateSettingsResponse, 
    IGetProfileVisibilityRequest, 
    IGetProfileVisibilityResponse, 
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
import { SettingsApi } from './settings.api'
import { 
    ICreateUserRequest, 
    ICreateUserResponse, 
    IDeleteUserProfileRequest, 
    IDeleteUserProfileResponse, 
    IGetUserProfileRequest, 
    IGetUserProfileResponse, 
    IUpdateUserProfileRequest,
    IUpdateUserProfileResponse 
} from '@mp/api/users/util';
import { IAuth } from '@mp/api/auth/util';
export interface SettingsStateModel {
    messages: string[];
}

@State<SettingsStateModel>({
    name: 'settings',
    defaults: {
        messages: []
    },
})
// TODO fix after testing
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
        console.log("Creating settings for user 5:");
        console.log(createSettingsResponse.data);

        // Create settings document for user 6
        createSettingsResponse = await httpsCallable<
        ICreateSettingsRequest,
        ICreateSettingsResponse
        >(
            this.settingsApi.functions, 
            'createSettings'
        )({userId: '6'});
        console.log("Creating settings for user 6:");
        console.log(createSettingsResponse.data);

        // User 6 blocks user 5
        let blockUserResponse = await httpsCallable<
            IUnblockUserRequest,
            IUnblockUserResponse
        >(
            this.settingsApi.functions, 
            'blockUser'
        )({userId: '6', blockedUserId: '5'});
        console.log("User 6 blocks user 5:");
        console.log(blockUserResponse.data);
        
        // Check if user 5 is blocked by user 6
        let isBlockedResponse = await httpsCallable<
            IIsBlockedRequest,
            IIsBlockedResponse
        >(
            this.functions,
            'isBlocked'
        )({userId: '6', blockedId: '5'});
        console.log("Check if user 5 is blocked by user 6:");
        console.log(isBlockedResponse.data);

        // User 6 unblocks user 5
        blockUserResponse = await httpsCallable<
            IUnblockUserRequest,
            IUnblockUserResponse
        >(
            this.settingsApi.functions, 
            'unblockUser'
        )({userId: '6', blockedUserId: '5'});
        console.log("User 6 unblocks user 5:");
        console.log(blockUserResponse.data);
        
        // Check if user 5 is blocked by user 6
        isBlockedResponse = await httpsCallable<
            IIsBlockedRequest,
            IIsBlockedResponse
        >(
            this.functions,
            'isBlocked'
        )({userId: '6', blockedId: '5'});
        console.log("Check if user 5 is blocked by user 6:");
        console.log(isBlockedResponse.data);

        // User 5 buys 10000 time
        let addTimeResponse = await httpsCallable<
            IAddTimeRequest,
            IAddTimeResponse
        >(
            this.settingsApi.functions,
            'addTime'
        )({
            userId: '5', 
            purchaseAmount: 10000
        });
        console.log("User 5 buys 10000 time:");
        console.log(addTimeResponse.data);

        // User 6 buys 20000 time
        addTimeResponse = await httpsCallable<
            IAddTimeRequest,
            IAddTimeResponse
        >(
            this.settingsApi.functions,
            'addTime'
        )({
            userId: '6', 
            purchaseAmount: 20000
        });
        console.log("User 6 buys 20000 time:");
        console.log(addTimeResponse.data);

        // User 6 uses 4000 time
        let subtractTimeResponse = await httpsCallable<
            ISubtractTimeRequest,
            ISubtractTimeResponse
        >(
            this.settingsApi.functions,
            'subtractTime'
        )({
            userId: '6', 
            amount: 4000
        });
        console.log("User 6 uses 4000 time:");
        console.log(subtractTimeResponse.data);

        // User 5 uses 200 time
        subtractTimeResponse = await httpsCallable<
            ISubtractTimeRequest,
            ISubtractTimeResponse
        >(
            this.settingsApi.functions,
            'subtractTime'
        )({
            userId: '5', 
            amount: 200
        });
        console.log("User 5 uses 200 time:");
        console.log(subtractTimeResponse.data);
        
        // User 6 changes profile visibility to Friends-Only
        let updateVisibilityResponse = await httpsCallable<
            IUpdatePrivacyRequest,
            IUpdatePrivacyResponse
        >(
            this.settingsApi.functions,
            'updateProfileVisibility'
        )({
            userId: '6', 
            profileVisibility: ProfilePrivacy.FRIENDS
        });
        console.log("User 6 changes profile visibility to Friends-Only:");
        console.log(updateVisibilityResponse.data);

        // Get the the profile visibility of user 6
        const getVisibilityResponse = await httpsCallable<
            IGetProfileVisibilityRequest,
            IGetProfileVisibilityResponse
        >(
            this.settingsApi.functions,
            'getProfileVisibility'
        )({
            userId: '6'
        });
        console.log("Get the the profile visibility of user 6:");
        console.log(getVisibilityResponse.data);

        // User 6 changes profile visibility to Everyone
        updateVisibilityResponse = await httpsCallable<
            IUpdatePrivacyRequest,
            IUpdatePrivacyResponse
        >(
            this.settingsApi.functions,
            'updateProfileVisibility'
        )({
            userId: '6', 
            profileVisibility: ProfilePrivacy.EVERYONE
        });
        console.log("User 6 changes profile visibility to Everyone:");
        console.log(updateVisibilityResponse.data);

        /*this.srvc.createSettings({userId: '1234'}).then((data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
        });*/
        ctx.patchState({
            //messages: MessagesState.chats
        })
    }

    @Action(CreateUserProfile)
    async createUserProfile(ctx: StateContext<SettingsStateModel>, {payload}: CreateSetting) {
        // Create user profile for user 5
        const auth5: IAuth = {
            id: '5',
            email: 'blahblah5@gmail.com'
        };
        let userCreatedResponse = await httpsCallable<
            ICreateUserRequest,
            ICreateUserResponse
        >(
            this.settingsApi.functions, 
            'createUserProfile'
        )({auth: auth5});
        console.log("Creating user profile for user 5:");
        console.log(userCreatedResponse.data);
        ctx.patchState({
            //messages: MessagesState.chats
        })
        // Create user profile for user 6
        const userProfile6: IAuth = {
            id: '6',
            email: 'blahblah6@gmail.com'
        };
        userCreatedResponse = await httpsCallable<
            ICreateUserRequest,
            ICreateUserResponse
        >(
            this.settingsApi.functions, 
            'createUserProfile'
        )({auth: userProfile6});
        console.log("Creating user profile for user 6:");
        console.log(userCreatedResponse.data);
    }

    @Action(GetUserProfile)
    async getUserProfile(ctx: StateContext<SettingsStateModel>, {payload}: CreateSetting) {
        // Get user profile of user 5
        const getUserProfileResult = await httpsCallable<
            IGetUserProfileRequest,
            IGetUserProfileResponse
        >(
            this.settingsApi.functions, 
            'getUserProfile'
        )({userId: '5'});
        console.log("Getting user profile for user 5:");
        console.log(getUserProfileResult.data);
        ctx.patchState({
            //messages: MessagesState.chats
        })
    }

    @Action(UpdateUserProfile)
    async updateUserProfile(ctx: StateContext<SettingsStateModel>, {payload}: CreateSetting) {
        // Get user profile of user 5
        const getUserProfileResult = await httpsCallable<
            IGetUserProfileRequest,
            IGetUserProfileResponse
        >(
            this.settingsApi.functions, 
            'getUserProfile'
        )({userId: '5'}).then(
            (result) => {
                return result.data;
            }
        );
        if (getUserProfileResult?.userProfile == null) { 
            console.log("User profile for user 5 is null");
            throw new Error("User profile for user 5 is null");
        }
        const userProfile5 = getUserProfileResult.userProfile;
        userProfile5.email = 'new.email@gmail.com'

        const emailUpdatedResponse = await httpsCallable<
            IUpdateUserProfileRequest,
            IUpdateUserProfileResponse
        >(
            this.settingsApi.functions, 
            'updateUserProfile'
        )({userProfile: userProfile5}).then(
            (result) => {
                return result.data;
            }
        );
        console.log("Updating email of user 5:");
        console.log(emailUpdatedResponse);
        ctx.patchState({
            //messages: MessagesState.chats
        })
    }

    @Action(DeleteUserProfile)
    async deleteSettings(ctx: StateContext<SettingsStateModel>, {payload}: CreateSetting) {
        const deleteUserProfileResult = await httpsCallable<
            IDeleteUserProfileRequest,
            IDeleteUserProfileResponse
        >(
            this.settingsApi.functions, 
            'deleteUserProfile'
        )({userId: '5'})
        ctx.patchState({
            //messages: MessagesState.chats
        })
        console.log("Deleting user 5");
        console.log(deleteUserProfileResult.data);
    }

  @Selector()
  static settings(state: SettingsStateModel) 
  {
    return state.messages;
  }

}