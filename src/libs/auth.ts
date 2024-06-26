import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogin";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              email: { label: "email", type: "email", placeholder: "email" },
              password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials, req) {

              if(!credentials) return null;
            
              const user = await userLogin(credentials.email, credentials.password);
        
              if (user) {
                return user
              } else {
                  return null
              }
            }
        })
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user}
        },
        async session({session, token, user}) {
            session.user = token as any
            return session
        }
    },
    pages: {
        signIn: '/signin',
        signOut: '/signout'
    }
}