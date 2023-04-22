import { State, Action, StateContext } from '@ngxs/store';
import { UpdateProfilePicture, UpdateBio, UpdateInterests } from './profile.actions';
import { ProfileStateModel } from './profile.model';

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profilePicture: '',
    bio: '',
    interests: []
  }
})
export class ProfileState {
  @Action(UpdateProfilePicture)
  updateProfilePicture(ctx: StateContext<ProfileStateModel>, action: UpdateProfilePicture) {
    const state = ctx.getState();
    const updatedState = {
      ...state,
      profilePicture: action.pictureUrl
    };
    ctx.patchState(updatedState);
  }

  @Action(UpdateBio)
  updateBio(ctx: StateContext<ProfileStateModel>, action: UpdateBio) {
    const state = ctx.getState();
    const updatedState = {
      ...state,
      bio: action.bio
    };
    ctx.patchState(updatedState);
  }

  @Action(UpdateInterests)
  updateInterests(ctx: StateContext<ProfileStateModel>, action: UpdateInterests) {
    const state = ctx.getState();
    const updatedState = {
      ...state,
      interests: action.interests
    };
    ctx.patchState(updatedState);
  }
}
