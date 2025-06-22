import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Starting authorize function");
        console.log("API_URL:", API_URL);
        console.log("Credentials:", {
          email: credentials?.email,
          hasPassword: !!credentials?.password,
        });

        try {
          const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data = await res.json();
          console.log("API login response:", data);

          // Map API response to match our User type
          if (data.user) {
            return {
              id: String(data.user.id),
              email: data.user.email,
              fullName: data.user.fullName,
              role: data.user.role,
              address: data.user.address,
              phonenumber: data.user.phonenumber,
              avatar: data.user.avatar,
              designs: data.user.designs,
              accessToken: data.accessToken,
            };
          }

          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          throw new Error("Internal error");
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(`${API_URL}/auth/oauth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profile),
          });

          const data = await res.json();
          console.log("Res", JSON.stringify(profile));
          
          if (data.user) {
            // Map Google auth response to our User type
            user.id = String(data.user.id);
            user.email = data.user.email;
            user.fullName = data.user.fullName;
            user.role = data.user.role;
            user.address = data.user.address;
            user.phonenumber = data.user.phonenumber;
            user.avatar = data.user.avatar;
            user.designs = data.user.designs;
            user.accessToken = data.accessToken;
          } else {
            return false;
          }

          return true;
        } catch (error) {
          console.error("Google auth error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        // Update token with user data
        token.id = user.id;
        token.email = user.email;
        token.fullName = user.fullName;
        token.role = user.role;
        token.address = user.address;
        token.phonenumber = user.phonenumber;
        token.avatar = user.avatar;
        token.designs = user.designs;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      // Update session with token data
      session.user = {
        id: token.id,
        email: token.email,
        fullName: token.fullName,
        role: token.role,
        address: token.address,
        phonenumber: token.phonenumber,
        avatar: token.avatar,
        designs: token.designs,
        accessToken: token.accessToken,
        emailVerified: null, // Add this property to satisfy AdapterUser type
      };

      // Add accessToken at session level as defined in types
      session.accessToken = token.accessToken;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
