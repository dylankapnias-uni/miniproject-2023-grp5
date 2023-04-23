import { IUserProfile } from "@mp/api/users/util";

export interface IUserMatch{
    user:IUserProfile | null | undefined,
    match:boolean,
}