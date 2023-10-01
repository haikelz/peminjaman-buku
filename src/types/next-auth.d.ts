import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      created_at: string;
      role: string;
      email: string;
      name: string;
      image: string;
      login?: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    created_at: string;
    login?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    created_at: string;
    login?: string;
  }
}
