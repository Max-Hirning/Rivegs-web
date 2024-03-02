/* eslint-disable @typescript-eslint/no-explicit-any */

import {IResponse} from "@/types";
import {NextAuthOptions} from "next-auth";
import {authAPI} from "@/modules/authForm";
import {userAPI} from "@/modules/settings";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    error: "/error",
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 2592000,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {label: "email", type: "email", required: true},
        password: {label: "password", type: "password", required: true},
      },
      name: "Credentials",
      type: "credentials",
      async authorize({email, password}: any) {
        try {
          const {data} = await authAPI.signIn({email, password});
          if(!(data?.userId)) throw Error("Sorry smth went wrong");
          const user = await userAPI.getUser(data.userId);
          if(!(user.data)) throw Error("Sorry smth went wrong");
          return ({
            jwt: data.token,
            id: data.userId,
            email: user.data.email,
            login: user.data.login,
            image: user.data.image,
            recipesIds: user.data.recipesIds,
            description: user.data.description,
            savedRecipes: user.data.savedRecipes,
          });
        } catch (e) {
          throw Error((e as IResponse<undefined>).message);
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({token, user, trigger}: any) => {
      if(trigger === "update" && token.sub) {
        const {data} = await userAPI.getUser(token.sub);
        if(data) {
          token.email = data.email;
          token.login = data.login;
          token.image = data.image;
          token.recipesIds = data.recipesIds;
          token.description = data.description;
          token.savedRecipes = data.savedRecipes;
        }
      }

      if(user) {
        token._id = user.id;
        token.jwt = user.jwt;
        token.email = user.email;
        token.login = user.login;
        token.image = user.image;
        token.recipesIds = user.recipesIds;
        token.description = user.description;
        token.savedRecipes = user.savedRecipes;
      }
      return token;
    },
    session: async ({session, token}: any) => {
      if(token) {
        session.user.id = token._id;
        session.user.jwt = token.jwt;
        session.user.email = token.email;
        session.user.login = token.login;
        session.user.image = token.image;
        session.user.recipesIds = token.recipesIds;
        session.user.description = token.description;
        session.user.savedRecipes = token.savedRecipes;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};