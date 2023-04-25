import { IRetrieveHomeUsersRequest } from "../requests";

export class RetrieveHomeUsersQuery {
    constructor(public readonly request: IRetrieveHomeUsersRequest) {}
}