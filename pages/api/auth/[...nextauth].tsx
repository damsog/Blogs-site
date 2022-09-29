import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"

export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.userId = token.uid;
        session.userEmail = token.email;
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.email = user.email;
      }
      return token;
    }
  },
  session: {
    strategy: 'jwt',
  },
}

export default NextAuth(authOptions)