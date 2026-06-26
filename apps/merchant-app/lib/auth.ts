import Google from "next-auth/providers/google";
import { Account, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import db from "@repo/db";

export const authoptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        })
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async signIn({ user, account }: {
            user: User,
            account: Account
        }) {
            if (account.providers !== "Google") {
                return false
            }
            const merchent = await db.merchent.findUnique({
                where: {
                    id: user.email
                }
            })
            if (!merchent) {
                await db.merchent.create({
                    data: {
                        email: user.email!,
                        name: user.name!,
                        auth_type: account.providers
                    }
                })
            }


            return true;
        },
        async jwt({ token, user }: {
            token: JWT,
            user: User
        }) {
            if (user.email) {
                const merchent = await db.merchent.findUnique({
                    where: {
                        email: user.email
                    }
                });
                token.merchentId = merchent?.id;

            }
            return token
        },
        async session({ session, token }:
            {
                session: Session,
                token: JWT
            }
        ) {
            session?.user.id = token.merchentId;
            return session
        }


    }

}