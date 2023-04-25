
  import { NestFactory } from '@nestjs/core';
  import * as functions from 'firebase-functions';
  import { CoreModule } from '../core.module';
    import { IAcceptUserRequest, IAcceptUserResponse, ICreateUserHomeRequest, ICreateUserHomeResponse, IRejectUserRequest, IRejectUserResponse, IRetrieveHomeUsersRequest, IRetrieveHomeUsersResponse } from '@mp/api/home/util';
    import { HomeService } from '@mp/api/home/feature';
  
    export const createUserHome = functions.https.onCall(
        async (
          request: ICreateUserHomeRequest
        ): Promise<ICreateUserHomeResponse> => {
          const app = await NestFactory.createApplicationContext(CoreModule);
          const service = app.get(HomeService);
          return service.createUserHome(request);
        }
      );


  export const acceptUser = functions.https.onCall(
    async (
      request: IAcceptUserRequest
    ): Promise<IAcceptUserResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(HomeService);
      return service.acceptUser(request);
    }
  );
  
  export const rejectUser = functions.https.onCall(
    async (
      request: IRejectUserRequest
    ): Promise<IRejectUserResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(HomeService);
      return service.rejectUser(request);
    }
  );
  
  export const retrieveHomeUsers = functions.https.onCall(
    async (
      request: IRetrieveHomeUsersRequest
    ): Promise<IRetrieveHomeUsersResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(HomeService);
      return service.fetchUsers(request);
    }
  );
  
  