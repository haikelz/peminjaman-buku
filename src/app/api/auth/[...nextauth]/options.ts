import format from "date-fns/format";
import id from "date-fns/locale/id";
import { Awaitable, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { env } from "~env.mjs";

const {
  NEXT_PUBLIC_GITHUB_ID,
  NEXT_PUBLIC_GITHUB_SECRET,
  NEXT_PUBLIC_GOOGLE_ID,
  NEXT_PUBLIC_GOOGLE_SECRET,
  NEXTAUTH_SECRET,
  ADMIN_ID,
  ADMIN_EMAIL,
  CREDENTIAL_ADMIN_USERNAME,
  CREDENTIAL_ADMIN_PASSWORD,
} = env;

const created_at = format(new Date(), "cccc, dd MMMM yyyy, k:m:s", {
  locale: id,
});

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      profile(profile: GithubProfile): Awaitable<User> {
        return {
          ...profile,
          id: profile.id.toString(),
          created_at: created_at,
          role: profile.login === "haikelz" ? "admin" : "guest",
          email: profile.email,
          name: profile.name,
          image: profile.avatar_url,
          login: profile.login,
        };
      },
      clientId: NEXT_PUBLIC_GITHUB_ID,
      clientSecret: NEXT_PUBLIC_GITHUB_SECRET,
    }),

    GoogleProvider({
      profile(profile: GoogleProfile): Awaitable<User> {
        return {
          ...profile,
          id: profile.sub,
          created_at: created_at,
          image: profile.picture,
          role: profile.email === ADMIN_EMAIL ? "admin" : "guest",
          email: profile.email,
          name: profile.name,
        };
      },
      clientId: NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: NEXT_PUBLIC_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials Login",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Username....",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Password....",
        },
      },
      async authorize(credentials) {
        const user = {
          id: ADMIN_ID,
          created_at: created_at,
          image: "/selamat-pagi.jpeg",
          role: "admin",
          name: CREDENTIAL_ADMIN_USERNAME,
          password: CREDENTIAL_ADMIN_PASSWORD,
        };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.created_at = user.created_at;
        token.login = user.login;
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.created_at = token.created_at;
        session.user.login = token.login;
      }

      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  theme: {
    colorScheme: "auto",
  },
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
};
