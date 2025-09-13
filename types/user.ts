export interface PostUser {
  name: string;
  nickname: string;
  profileImage: string;
  verified: boolean;
}
export interface User extends PostUser {
  id: string;
}
