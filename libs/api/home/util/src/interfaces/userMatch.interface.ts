import { IProfile } from "@mp/api/profiles/util";

export interface IUserMatch{
    user:IProfile | null | undefined,
    match:boolean ;
}