import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import connectionToDatabase from "../../../../../lib/db";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";


const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
           
            credentials: {
                //username: { label: "Username", type: "text", placeholder: "jsmith" },
                //password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                
                const {email, password} = credentials;
                
                try{
                    await connectionToDatabase();
                    const user = await User.findOne({email});

                    if(!user){
                        return null;
                    }

                   const passwordMatched =  await bcrypt.compare(password, user.password);
                   if(!passwordMatched){
                    return null;
                   }
                     
                   return user;

                }catch(error){
                    console.log("error:",error)
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },

}
const handler = NextAuth(authOptions);
export{handler as GET, handler as POST};