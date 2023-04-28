import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { HomeService } from './home.service';
import expect from 'expect'
import { AcceptUserCommand, CreateUserHomeCommand, IAcceptUserRequest, IAcceptUserResponse, ICreateUserHomeRequest, ICreateUserHomeResponse, IParsingData, IUserRef } from '@mp/api/home/util';


describe("API Home Feature Tests", () => {
    let homeService : HomeService
    let commandBus: CommandBus

    let mockUserI: IUserRef
    let mockParsingData: IParsingData

    let mockUserIB: IUserRef
    let mockParsingDataB: IParsingData


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [HomeService, CommandBus],
        }).compile();
    
        homeService = module.get<HomeService>(HomeService);
        commandBus = module.get<CommandBus>(CommandBus);

        const tempMockUserI: IUserRef = {
          userId: "mockUser",
          accepted: ["anotherUser"],
          visited: ["anotherUser", "yetAnotherUser"]
        }

        mockUserI = tempMockUserI
        
        const tempMockParsingData: IParsingData = {
          userId: "mockUser",
          userRef: mockUserI
        }

        mockParsingData = tempMockParsingData

        const tempMockUserIB: IUserRef = {
          userId: "anotherUser",
          accepted: ["anotherUser"],
          visited: ["anotherUser", "yetAnotherUser"]
        }

        mockUserIB = tempMockUserI
        
        const tempMockParsingDataB: IParsingData = {
          userId: "anotherUser",
          userRef: mockUserI
        }

        mockParsingDataB = tempMockParsingData



      }),

    describe("CreateUser function", () => {
        it("Should create a user", async () => {
              //given
              const mockRequest: ICreateUserHomeRequest = {
                userId: "mockUser"
              };
              
              const mockResponse: ICreateUserHomeResponse = {
                home: mockParsingData
              };

              jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(mockResponse);
        
              //when
              const result = await homeService.createUserHome(mockRequest);
        
              //then
              expect(commandBus.execute).toHaveBeenCalledWith(new CreateUserHomeCommand(mockRequest));
              expect(result).toBe(mockResponse);
        });
    })


    describe("AcceptUser function", () => {
      it("Accepts valid user", ()=>{
        //given
        const mockRequest: IAcceptUserRequest = {
          userId: "mockUser",
          swipedUserId: "anotherUser"
        }

        const mockResponse: IAcceptUserResponse = {
          home: mockParsingData
        }

        jest.spyOn(commandBus, "execute").mockResolvedValueOnce(mockResponse)

        //when
        const result = homeService.acceptUser(mockRequest)

        //then
        expect(commandBus.execute).toHaveBeenCalledWith(new AcceptUserCommand(mockRequest))
        expect(result).toBe(mockRequest)
      })

    })
})