import { type Typesaurus } from 'typesaurus';

declare global {
  interface UserSchema {
    information: UserInfoSchema;
    created: Typesaurus.ServerDate | null;
  }

  interface UserInfoSchema {
    email: string;
    name: string | null;
    lastName: string | null;
  }
}
