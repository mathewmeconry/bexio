export namespace UsersStatic {
  export interface UserSmall {
    id: number;
    nickname?: string;
    firstname: string;
    lastname: string;
    email?: string;
    color: string;
    phone_fixed?: string;
    phone_mobile?: string;
    is_superadmin: boolean;
  }

  export interface UserFull extends UserSmall {
    profile_image: string;
  }

  export enum UsersSearchparameters {
    id = "id",
    nickname = "nickname",
    firstname = "firstname",
    lastname = "lastname",
    color = "color"
  }
}
