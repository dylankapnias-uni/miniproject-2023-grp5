import { IChatReferences } from "./chat-references.interface";
import { IUserProfile } from '@mp/api/users/util';
export interface IMuthaFuckingAppChatList {
    userId: string,
    chatList: {
      chatRef: string,
      otherUser: IUserProfile
    }[]
}