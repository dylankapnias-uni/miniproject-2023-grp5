import { 
    CommandHandler, 
    ICommandHandler, 
    EventPublisher 
} from '@nestjs/cqrs';
import { UserProfileRepository } from '@mp/api/users/data-access';
import { UserProfile } from '../models';
import { 
    DeleteUserProfileCommand, 
    IDeleteUserProfileResponse 
} from '@mp/api/users/util';

@CommandHandler(DeleteUserProfileCommand)
export class DeleteUserProfileHandler
implements ICommandHandler<DeleteUserProfileCommand,IDeleteUserProfileResponse> {
    constructor(
        public readonly repository: UserProfileRepository,
        public readonly publisher: EventPublisher
    ){}

    async execute(command: DeleteUserProfileCommand) {
        const userId = command.request.userId;
        const userProfileDocRef = await this.repository.getUserProfile(userId);
        const userProfileData = userProfileDocRef?.data();

        if (userProfileData == null || userProfileData == undefined) {
            return {userId: userId, deleted: false}
        }
        
        const userProfile = this.publisher.mergeObjectContext(UserProfile.fromData(userProfileData));

        userProfile.delete();
        userProfile.commit();

        const response: IDeleteUserProfileResponse = {userId: userProfile.userId, deleted: true};
        return response;
    }
}