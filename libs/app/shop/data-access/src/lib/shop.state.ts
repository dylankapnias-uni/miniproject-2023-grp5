import { State, Action, StateContext } from '@ngxs/store';
import { BuyTime } from './shop.actions';

export interface ShopStateModel {
  time: number;
}

@State<ShopStateModel>({
  name: 'shop',
  defaults: {
    time: 0
  }
})
export class ShopState {
  @Action(BuyTime)
  buyTime(ctx: StateContext<ShopStateModel>, action: BuyTime) {
    const state = ctx.getState();
    const updatedState = {
      ...state,
      time: state.time + action.amount,
    };
    ctx.setState(updatedState);
  }
}
