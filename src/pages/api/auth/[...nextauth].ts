import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GithubProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ],
})