export class UpdateBio {
    static readonly type = '[Profile] Update Bio';
    constructor(public bio: string) {}
  }
  
  export class UpdateInterests {
    static readonly type = '[Profile] Update Interests';
    constructor(public interests: string[]) {}
  }
  export class UpdateProfilePicture {
    static readonly type = '[Profile] Update Profile Picture';
    constructor(public pictureUrl: string) {}
  }
    