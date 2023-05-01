import {  ICreateUserHomeRequest } from '../requests';

export class CreateUserHomeCommand {
  constructor(public readonly request: ICreateUserHomeRequest) {}
}
