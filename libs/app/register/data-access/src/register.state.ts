import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext } from '@ngxs/store';

export interface RegisterStateModel {
  registerForm: {
    model: {
      email: string | null;
      phoneNumber: number;
      dateOfBirth: string | null;
      age: number;
      password: string | null;
      confirmPassword: string | null;
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
        email: null,
        phoneNumber: 0,
        dateOfBirth: null,
        age: 0,
        password: null,
        confirmPassword: null,
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
      const phoneNumber = state.registerForm.model.phoneNumber;
      const dateOfBirth = state.registerForm.model.dateOfBirth;
      const age = state.registerForm.model.age;
      const confirmPassword = state.registerForm.model.confirmPassword; 

      if(password !== confirmPassword) {
        return ctx.dispatch(new SetError('Password and confirm password not match'));
      }
      if (email && password) {
        return ctx.dispatch(new AuthRegister(email, password));
      }
      return ctx.dispatch(new SetError('Email or password not set'));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
