export interface User {
  id: string;
  displayName: string;
  email: string;
  email_verified: boolean;
  nickname: string;
  picture: string | undefined;
}
