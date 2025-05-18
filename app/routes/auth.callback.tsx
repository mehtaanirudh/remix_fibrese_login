// app/routes/auth/callback.tsx
import { ActionFunction, redirect } from "@remix-run/node";
import { getAuth } from "~/firebase-auth.server";
import { sessionStorage } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const token = formData.get("token");


  if (!token || typeof token !== "string") {
    console.error("Missing or invalid token");
    return redirect("/?error=missing_token");
  }

  // 🔐 Verify the token
  const decoded = await getAuth().verifyIdToken(token);

  // 🎟️ Start user session
  const session = await sessionStorage.getSession();
  session.set("uid", decoded.uid);
  session.set("email", decoded.email);
  session.set("token", token); 

  return redirect("/account", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
};
