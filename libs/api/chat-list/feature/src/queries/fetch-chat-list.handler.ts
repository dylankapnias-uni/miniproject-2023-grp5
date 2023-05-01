import { FetchChatListQuery, IMuthaFuckingAppChatList, IFetchChatListResponse,IChatList } from "@mp/api/chat-list/util";
import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserProfileRepository } from '@mp/api/users/data-access';
import { ChatListRepository } from "@mp/api/chat-list/data-access";
import {IUserProfile} from '@mp/api/users/util'
@QueryHandler(FetchChatListQuery)
export class FetchChatListHandler
    implements IQueryHandler<FetchChatListQuery,IFetchChatListResponse>{
    constructor(private publisher: EventPublisher, private repository:ChatListRepository, private readonly userRepo: UserProfileRepository ) {}
    async execute(query: FetchChatListQuery) {
        console.log(`${FetchChatListHandler.name}`);
        const request = query.request;
        //TODO rename stuff to be suitable for all ages
        const data2ElectricBoogaloo: IChatList = (await this.repository.fetchFuckingAppChatList(request.userId));
        console.log({data2ElectricBoogaloo: data2ElectricBoogaloo});

    //     userId: string,
    // chatList: {
    //   chatRef: string,
    //   otherUser: IUserProfile
    // }[]

        if(data2ElectricBoogaloo == undefined || data2ElectricBoogaloo == null) throw new Error("Fucking die typescript")
        const response: IMuthaFuckingAppChatList = {userId:data2ElectricBoogaloo.userId, chatList:[]};
        if (data2ElectricBoogaloo.chatList == null || data2ElectricBoogaloo.chatList == undefined)
            return {chatList: response} as IFetchChatListResponse;
        for (let x = 0; x < data2ElectricBoogaloo.chatList.length; ++x){
            console.log(x + " Fuck this shit");
            console.log(data2ElectricBoogaloo.chatList[x].otherUserId);

            const otherUserRef = await this.userRepo.getUserProfile(data2ElectricBoogaloo.chatList[x].otherUserId);
            if (otherUserRef == null||otherUserRef==undefined)
                continue;
            const otherUserData = otherUserRef.data();
            if (otherUserData == undefined)
                continue;
                
            response.chatList.push({chatRef: data2ElectricBoogaloo.chatList[x].chatRef, otherUser: otherUserData});
        }
        console.log(response);
        const response2ElectricBoogaloo: IFetchChatListResponse = {
            chatList: response
        };
        return response2ElectricBoogaloo;
    }
}