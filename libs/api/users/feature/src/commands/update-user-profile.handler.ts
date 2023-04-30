import { 
    CommandHandler, 
    ICommandHandler, 
    EventPublisher 
} from '@nestjs/cqrs';
import { UserProfile } from '../models';
import { 
    UpdateUserProfileCommand, 
    IUpdateUserProfileResponse 
} from '@mp/api/users/util';

@CommandHandler(UpdateUserProfileCommand)
export class UpdateUserProfileHandler
implements ICommandHandler<UpdateUserProfileCommand,IUpdateUserProfileResponse> {
    constructor(public readonly publisher: EventPublisher){}

    async execute(command: UpdateUserProfileCommand) {
        const userProfileData = command.request.userProfile;
        // console.log(userProfileData);

        const userProfile = this.publisher.mergeObjectContext(UserProfile.fromData(userProfileData));

        userProfile.update();
        userProfile.commit();

        const response: IUpdateUserProfileResponse = {userProfile: userProfileData};
        return response;
    }
}