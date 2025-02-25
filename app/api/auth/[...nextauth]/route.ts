import NextAuth from "next-auth";
import { authConfig } from "../../../../auth.config";

console.log("gngngng pipi")

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
