import { UserResponse } from "@/types/responses/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend the User type to include accessToken and refreshToken
import type { User as NextAuthUser } from "next-auth";
import { TokensResponse } from "@/types/responses/token";

declare module "next-auth" {
  interface Session {
    user: {
      username?: string;
      email?: string;
      accessToken?: string;
      refreshToken?: string;
    };
  }
}

interface ExtendedUser extends NextAuthUser {
  username: string;
  accessToken: string;
  refreshToken: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_USER_API_BASE_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const data = await res.json();
        const userData = getUser(data.accessToken);
        if (!res.ok || !data.accessToken || !userData) {
          throw new Error("Invalid credentials");
        }
        if (res.ok && data.accessToken && userData) {
          return {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          } as ExtendedUser;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        const u = user as ExtendedUser;
        token.accessToken = u.accessToken;
        token.refreshToken = u.refreshToken;
        token.username = u.username;
        token.email = u.email;
        if (u.accessToken && isExpired(u.accessToken)) {
          return await refreshAccessToken(u.accessToken);
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        username: token.username as string | undefined,
        email: token.email as string | undefined,
        accessToken: token.accessToken as string | undefined,
        refreshToken: token.refreshToken as string | undefined,
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

function getUser(token: string): null | UserResponse {
  const user = JSON.parse(atob(token.split(".")[1]));

  if (!user) {
    return null;
  }

  if (!user.exp || !user.username || !user.email || !user.id) {
    return null;
  }

  if (user.exp * 1000 < Date.now()) {
    return null;
  }

  const info: UserResponse = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  return info;
}

function isExpired(token: string): boolean {
  const decoded = JSON.parse(atob(token.split(".")[1]));
  return decoded.exp * 1000 < Date.now();
}

async function refreshAccessToken(token: string): Promise<TokensResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: token }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw data;

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (err) {
    console.error("Refresh token failed", err);
    throw new Error("Failed to refresh access token");
  }
}
