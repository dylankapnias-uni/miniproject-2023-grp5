import { IFetchNotificationsRequest } from '../requests';
export class FetchNotificationsQuery {
    constructor(public readonly request: IFetchNotificationsRequest) {}
}