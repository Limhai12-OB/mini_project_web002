import NextAuth from "next-auth";
import { loginService } from "./service/auth.service";
import Credentials from "next-auth/providers/credentials";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials?.email?.toString().trim();
        const password = credentials?.password?.toString();

        if (!email || !password) {
          return null;
        }

        try {
          const user = await loginService({ email, password });
          return user;
        } catch (error) {
          console.error("Auth authorize failed:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.BETTER_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.token = user.token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        token: token.token,
      };
      return session;
    },
  },
});
