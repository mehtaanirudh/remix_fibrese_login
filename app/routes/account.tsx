import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { getUserSession } from "~/session.server";
import { getAuth } from "~/firebase-auth.server";
import { connectFirestore } from "~/firebase-connect.server";

type LoaderData = {
  email: string | null;
  sales: number | 0;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getUserSession(request);
//   const email = session.get("email");
//   const uid = session.get("uid");
  const token = session.get("token");

  if (!token || typeof token !== "string") return redirect("/");

  // for security - verify the token before calling FB
  const decoded = await getAuth().verifyIdToken(token);
  const uid = decoded.uid;
  const email = decoded.email;

  if (!uid || !email) return redirect("/error?message=Invalid session");

  const doc = await connectFirestore.collection("sales").doc(uid).get();
  const sales = doc.exists ? doc.data()?.sales ?? 0 : 0;

  const data: LoaderData = { email, sales };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};

export default function Account() {
  const { email, sales } = useLoaderData<LoaderData>();

  return (

    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Your account information</h1>
          <p className="py-6">
            This is a protected route and your email is <strong>{email}</strong>. This information comes from <strong>zkootie-auth-services-dev</strong>
          </p>
          <p className="py-6">
            Your sales are <strong>£{sales}</strong>. This information comes from <strong>zkootie-connect-dev</strong>
          </p>
          <Form method="post" action="/auth/logout">
            <button 
                type='submit'
                className="btn btn-primary"
            >
                Logout
          </button>
          </Form>
          
        </div>
      </div>
    </div>
  );
}
