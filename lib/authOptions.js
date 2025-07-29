import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import connectionToDatabase from "./db";
import User from "../models/user";

export const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',

            credentials: {},
            async authorize(credentials) {

                const { email, password } = credentials;

                try {
                    await connectionToDatabase();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    const passwordMatched = await bcrypt.compare(password, user.password);
                    if (!passwordMatched) {
                        return null;
                    }

                    return user;

                } catch (error) {
                    console.log("error:", error)
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },

    callbacks: {
        async signIn({ user, account }) {
            try {
                await connectionToDatabase();

                if (account) {
                    const {providerAccountId, provider} = account;
                    const { name, email } = user;

                    const existingUser = await User.findOne({ 
                        $or:[
                            {email: email},
                            {providerAccountId: providerAccountId}
                        ]
                     });

                    if (!existingUser) {
                        const newUser = new User({
                            name,
                            email,
                            password: "", 
                            role: "customer",
                            providerAccountId,
                            provider
                        });

                        await newUser.save();
                    }
                }

                return true; 
            } catch (error) {
                console.error(" Error in signIn callback:", error);
                return false; 
            }
        },

        // user and session e role add
        async jwt({token, user}){
            if(user){
                token.role = user.role;
            }
            return token;
        },

        async session({session, token}){
            session.user.role = token.role;
            return session;
        }
    }

}

