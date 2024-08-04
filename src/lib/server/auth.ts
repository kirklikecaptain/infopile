import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import { prisma } from "./prisma";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const auth = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => ({
    username: attributes.username
  })
});

export interface UserAttributes {
  username: string;
}

declare module "lucia" {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: UserAttributes;
  }
}
