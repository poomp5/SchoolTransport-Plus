import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip all paths that should not be internationalized:
  // - /api routes (NextAuth, weather, etc.)
  // - Next.js internals (/_next, /_vercel)
  // - files with an extension (e.g. logo.png, favicon.ico)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
