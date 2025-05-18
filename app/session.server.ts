import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: [process.env.SESSION_SECRET!],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
  },
});

export async function getUserSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

export async function getUser(request: Request) {
  const session = await getUserSession(request);
  return session.get("uid");
}

export async function requireUser(request: Request) {
  const uid = await getUser(request);
  if (!uid) throw new Response("Unauthorized", { status: 401 });
  return uid;
}
