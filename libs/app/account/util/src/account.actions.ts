import { Account } from './account.interface';

export class UpdateAccountDetails {
  static readonly type = '[Account] Update Details';
  constructor(public payload: Account) {}
}