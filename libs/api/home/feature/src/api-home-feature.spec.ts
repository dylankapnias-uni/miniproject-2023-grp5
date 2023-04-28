import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { HomeService } from './home.service';
import expect from 'expect'
import { AcceptUserCommand, CreateUserHomeCommand, IAcceptUserRequest, IAcceptUserResponse, ICreateUserHomeRequest, ICreateUserHomeResponse, IHome, IParsingData, IRejectUserRequest, IRejectUserResponse, IRetrieveHomeUsersRequest, IRetrieveHomeUsersResponse, IUserMatch, IUserRef, RejectUserCommand, RetrieveHomeUsersQuery } from '@mp/api/home/util';
import { IInterests } from '@mp/api/interests/util';
import { IUserProfile } from '@mp/api/users/util';


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
      it("Accepts valid user", async ()=>{
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
        const result = await homeService.acceptUser(mockRequest)

        //then
        expect(commandBus.execute).toHaveBeenCalledWith(new AcceptUserCommand(mockRequest))
        expect(result).toBe(mockResponse)
      }),

      it("Accepts invalid user", async ()=>{
        //given
        const mockRequest: IAcceptUserRequest = {
          userId: "mockUser",
          swipedUserId: "incorrectUser"
        }

        jest.spyOn(commandBus, "execute").mockResolvedValueOnce(null)

        //when
        const result = await homeService.acceptUser(mockRequest)

        //then
        expect(commandBus.execute).toHaveBeenCalledWith(new AcceptUserCommand(mockRequest))
        expect(result).toBe(null)
      });
    })

    describe("Reject user", ()=>{
        it("Reject valid user", async ()=>{
          //given
          const mockRequest: IRejectUserRequest = {
            userId: "mockUser",
            swipedUserId: "anotherUser"
          }
  
          const mockResponse: IRejectUserResponse = {
            home: mockParsingData
          }
  
          jest.spyOn(commandBus, "execute").mockResolvedValueOnce(mockResponse)
  
          //when
          const result = await homeService.rejectUser(mockRequest)
  
          //then
          expect(commandBus.execute).toHaveBeenCalledWith(new RejectUserCommand(mockRequest))
          expect(result).toBe(mockResponse)
        })

        it("Reject invalid user", async ()=>{
          //given
          const mockRequest: IAcceptUserRequest = {
            userId: "mockUser",
            swipedUserId: "incorrectUser"
          }
  
          jest.spyOn(commandBus, "execute").mockResolvedValueOnce(null)
  
          //when
          const result = await homeService.acceptUser(mockRequest)
  
          //then
          expect(commandBus.execute).toHaveBeenCalledWith(new AcceptUserCommand(mockRequest))
          expect(result).toBe(null)
        });
    })

    describe("Fetch user", () => {
      it("Fetch valid user with filter and matched", async () => {
        //given
        const mockFilter: IInterests = {
          interest: "mock",
          category: "fake"
        }
        const mockRequest: IRetrieveHomeUsersRequest = {
          userId: "mockUser",
          filter: [mockFilter]
        }
        const mockUserProfile: IUserProfile = {
          userId: "anotherUser"
        }
        const mockUserMatch: IUserMatch = {
          user: mockUserProfile,
          match: true
        }
        const mockUsers: IHome = {
          userId: "mockUser",
          userList: [mockUserMatch]
        }
        const mockResponse: IRetrieveHomeUsersResponse = {
          users: mockUsers
        }

        jest.spyOn(commandBus, "execute").mockResolvedValueOnce(mockResponse)

        //when
        const result = await homeService.fetchUsers(mockRequest)

        //then
        expect(commandBus.execute).toHaveBeenCalledWith(new RetrieveHomeUsersQuery(mockRequest))
        expect(result).toBe(mockResponse)
        expect(result.users.userList[0].match).toBe(true)
      }),

      it("Fetch valid user with filter and not matched", async () => {
        //given
        const mockFilter: IInterests = {
          interest: "mock",
          category: "fake"
        }
        const mockRequest: IRetrieveHomeUsersRequest = {
          userId: "mockUser",
          filter: [mockFilter]
        }
        const mockUserProfile: IUserProfile = {
          userId: "anotherUser"
        }
        const mockUserMatch: IUserMatch = {
          user: mockUserProfile,
          match: false
        }
        const mockUsers: IHome = {
          userId: "mockUser",
          userList: [mockUserMatch]
        }
        const mockResponse: IRetrieveHomeUsersResponse = {
          users: mockUsers
        }

        jest.spyOn(commandBus, "execute").mockResolvedValueOnce(mockResponse)

        //when
        const result = await homeService.fetchUsers(mockRequest)

        //then
        expect(commandBus.execute).toHaveBeenCalledWith(new RetrieveHomeUsersQuery(mockRequest))
        expect(result).toBe(mockResponse)
        expect(result.users.userList[0].match).toBe(false)
      }),

      it("Fetch valid user without filter and matched", async () => {
        //given
        const mockRequest: IRetrieveHomeUsersRequest = {
          userId: "mockUser",
          filter: null
        }
        const mockUserProfile: IUserProfile = {
          userId: "anotherUser"
        }
        const mockUserMatch: IUserMatch = {
          user: mockUserProfile,
          match: true
        }
        const mockUsers: IHome = {
          userId: "mockUser",
          userList: [mockUserMatch]
        }
        const mockResponse: IRetrieveHomeUsersResponse = {
          users: mockUsers
        }

        jest.spyOn(commandBus, "execute").mockResolvedValueOnce(mockResponse)

        //when
        const result = await homeService.fetchUsers(mockRequest)

        //then
        expect(commandBus.execute).toHaveBeenCalledWith(new RetrieveHomeUsersQuery(mockRequest))
        expect(result).toBe(mockResponse)
        expect(result.users.userList[0].match).toBe(true)
      }),

      it("Fetch valid user without filter and not matched", async () => {
        //given
        const mockRequest: IRetrieveHomeUsersRequest = {
          userId: "mockUser",
          filter: null
        }
        const mockUserProfile: IUserProfile = {
          userId: "anotherUser"
        }
        const mockUserMatch: IUserMatch = {
          user: mockUserProfile,
          match: false
        }
        const mockUsers: IHome = {
          userId: "mockUser",
          userList: [mockUserMatch]
        }
        const mockResponse: IRetrieveHomeUsersResponse = {
          users: mockUsers
        }

        jest.spyOn(commandBus, "execute").mockResolvedValueOnce(mockResponse)

        //when
        const result = await homeService.fetchUsers(mockRequest)

        //then
        expect(commandBus.execute).toHaveBeenCalledWith(new RetrieveHomeUsersQuery(mockRequest))
        expect(result).toBe(mockResponse)
        expect(result.users.userList[0].match).toBe(false)
      })

    })

})