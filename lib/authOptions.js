import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import connectionToDatabase from "./db";
import User from "../models/user";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    await connectionToDatabase();
                    const user = await User.findOne({ email });

                    if (!user) return null;

                    const passwordMatched = await bcrypt.compare(password, user.password);
                    if (!passwordMatched) return null;

                    return user;
                } catch (error) {
                    console.log("Credentials login error:", error);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
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

                const { providerAccountId, provider } = account || {};
                const { name, email } = user;

                let existingUser = await User.findOne({
                    email,
                });


                if (!existingUser) {
                    existingUser = await User.create({
                        name,
                        email,
                        password: "",
                        role: "customer",
                        providerAccountId,
                        provider,
                    });
                }

                return true; // allow login
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false;
            }
        },

        async jwt({ token, user }) {
            await connectionToDatabase();


            if (user?.email) {
                const dbUser = await User.findOne({ email: user.email });

                token.role = dbUser?.role || "customer";
            }

            return token;
        },

        async session({ session, token }) {
            // console.log("session check", session)
            // console.log("token check", token)
            session.user.role = token.role;
            return session;
        },
    },
};


