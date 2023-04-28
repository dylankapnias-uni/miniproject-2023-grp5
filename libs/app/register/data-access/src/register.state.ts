import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext } from '@ngxs/store';

export interface RegisterStateModel {
  registerForm: {
    model: {
      displayName: string | null;
      email: string | null;
      password: string | null;
      phone: string | null;
      age: number | null;
      dateOfBirth: string | null;
    };
    dirty: false;
    status: string;
    errors: object;
  };
}

@State<RegisterStateModel>({
  name: 'register',
  defaults: {
    registerForm: {
      model: {
        displayName: null,
        email: null,
        password: null,
        phone: null,
        age: null,
        dateOfBirth: null,
      },
      dirty: false,
      status: '',
      errors: {},
    },
  },
})
@Injectable()
export class RegisterState {
  @Action(Register)
  async register(ctx: StateContext<RegisterStateModel>) {
    try {
      const state = ctx.getState();
      const email = state.registerForm.model.email;
      const password = state.registerForm.model.password;

      if (email && password) {
        return ctx.dispatch(new AuthRegister(email, password));
      }
      return ctx.dispatch(new SetError('Email or password not set'));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
