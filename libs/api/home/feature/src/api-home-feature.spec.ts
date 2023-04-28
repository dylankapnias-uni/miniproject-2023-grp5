import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { HomeService } from './home.service';
import expect from 'expect'
import { CreateUserHomeCommand, ICreateUserHomeRequest, ICreateUserHomeResponse, IParsingData, IUserRef } from '@mp/api/home/util';


describe("API Home Feature Tests", () => {
    let homeService : HomeService
    let commandBus: CommandBus

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [HomeService, CommandBus],
        }).compile();
    
        homeService = module.get<HomeService>(HomeService);
        commandBus = module.get<CommandBus>(CommandBus);
      }),

    describe("CreateUser function", () => {
        it("Should create a user", async () => {
            const mockRequest: ICreateUserHomeRequest = {
                userId: "mockUser"
              };
              const mockUserI: IUserRef = {
                userId: "mockUser",
                accepted: ["anotherUser"],
                visited: ["anotherUser", "yetAnotherUser"]
              }

              const mockParsingData: IParsingData = {
                userId: "mockUser",
                userRef: mockUserI
              }
              const mockResponse: ICreateUserHomeResponse = {
                home: mockParsingData
              };

              jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(mockResponse);
        
              const result = await homeService.createUserHome(mockRequest);
        
              expect(commandBus.execute).toHaveBeenCalledWith(new CreateUserHomeCommand(mockRequest));
              expect(result).toBe(mockResponse);
        });
    })
})