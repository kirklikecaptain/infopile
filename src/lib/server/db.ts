import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { dev } from "$app/environment";

export const db = new PrismaClient();

const adapter = new PrismaAdapter(db.session, db.user);

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

declare module "lucia" {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: {
      username: string;
    };
  }
}
